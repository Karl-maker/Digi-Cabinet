import { db } from "../../helper/db.mjs";
import config from "../../config/config.mjs";
import association from "./association-service.mjs";

export default {
  getById,
  getManyByName,
  create,
  delete: _delete,
};

async function _delete(req) {
  return {};
}

async function create(req) {
  // Get user input and sanitize it
  const { name, description, number, email, country } = req.body;
  const user = req.user;

  //-----Save Institution-------

  // check if user email already exist--------------
  if (await db.institution.findOne({ email: email.toLowerCase() })) {
    throw {
      name: "AlreadyExist",
      message: {
        prompt: "Already Exist",
        field: { email: "Email already in use" },
      },
    };
  }

  const new_institution = await db.institution.create({
    name,
    info: {
      description: description,
      number: number,
      email: email.toLowerCase(),
    },
    country,
  });

  //-----Create Association Between User and Institution--------

  await association.createAssociation({
    user: user._id,
    institution: new_institution._id,
    is_admin: true,
    permission_level: 5,
  });

  return { institution: new_institution };
}

async function getById(req) {
  const id = req.params.id;
  var meta_data, institution;

  try {
    institution = await db.institution.findOne(
      { _id: id },
      {
        __v: 0,
      }
    );
    meta_data = {
      source: "database",
    };
  } catch (err) {
    throw {
      name: "NotFound",
      message: `${id} Not Found`,
    };
  }

  return { meta_data, institution };
}

async function getManyByName(req) {
  const page_size = parseInt(req.query.page_size, 10);
  const page_number = parseInt(req.query.page_number, 10);
  const q = req.query.q.toLowerCase();
  const order = "asc";
  var institutions = [{}];
  var meta_data = { source: "database" };

  //------Pagenation Helpers-------------

  const page = Math.max(0, page_number);

  //------Order Helpers------------------

  var get_order;

  //default
  if (!order) {
    get_order = {
      name: "asc",
    };
  } else {
    get_order = {
      name: order,
    };
  }

  var query = {
    is_confirmed: true,
  };

  if (q) {
    query.name = { $regex: `${q}`, $options: `i` };
  } else {
    throw { name: "NotFound", message: "No Institutions" };
  }

  try {
    institution = await db.institution
      .find(
        { $or: [{ query }] },
        {
          __v: 0,
        }
      )
      .limit(page_size)
      .skip(page_size * page)
      .sort(get_order); // get all

    meta_data.amount = institution.length;
  } catch (e) {
    throw { name: "NotFound", message: `${q} Not Found` };
  }

  return { institution, meta_data };
}
