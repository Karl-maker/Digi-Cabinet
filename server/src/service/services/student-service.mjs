import { db } from "../../helper/db.mjs";
import association from "./association-service.mjs";

export default {
  create,
  getAllByName,
  getById,
};

async function create(req) {
  var student;
  const user = req.user;
  var {
    first_name,
    middle_name,
    last_name,
    contact_info_email,
    contact_info_number,
    institution,
    more_info,
    sex,
    date_of_birth,
    guardian_info,
  } = req.body;

  //Sanitize

  if (contact_info_email) {
    contact_info_email = contact_info_email.toLowerCase();
  }

  if (first_name) {
    first_name = first_name.toLowerCase();
  }

  if (last_name) {
    last_name = last_name.toLowerCase();
  }

  if (middle_name) {
    middle_name = middle_name.toLowerCase();
  }

  //---------------------------------------------------------------------

  student = await db.student.create({
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    sex,
    contact_info: { email: contact_info_email, number: contact_info_number },
    guardian_info: guardian_info,
    info: more_info,
    institution,
  });

  return student;
}

async function getAllByName(req) {
  const page_size = parseInt(req.query.page_size, 10);
  const page_number = parseInt(req.query.page_number, 10);
  const q = req.query.q.toLowerCase();
  const order = "asc";
  var students = [{}];
  var query = {};
  var meta_data = { source: "database" };

  //------Pagenation Helpers-------------

  const page = Math.max(0, page_number);

  //------Order Helpers------------------

  var get_order;

  //default
  if (!order) {
    get_order = {
      first_name: "asc",
    };
  } else {
    get_order = {
      first_name: order,
    };
  }

  if (q) {
    query.first_name = { $regex: `${q}`, $options: `i` };
    query.last_name = { $regex: `${q}`, $options: `i` };
    query.middle_name = { $regex: `${q}`, $options: `i` };
  } else {
    throw { name: "NotFound", message: "No Students" };
  }

  try {
    students = await db.student
      .find(
        { $or: [{ query }] },
        {
          __v: 0,
        }
      )
      .limit(page_size)
      .skip(page_size * page)
      .sort(get_order); // get all

    meta_data.amount = students.length;
  } catch (e) {
    throw { name: "NotFound", message: `${q} Not Found` };
  }

  return { students, meta_data };
}

async function getById(req) {
  const id = req.params.id;
  var student, meta_data, user;

  try {
    user = req.user._id;
  } catch (err) {
    user = 0;
  }

  //Get User's Association

  try {
    student = await db.student.findOne(
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

  if (
    await association.isAdminUnprotected({
      user,
      institution: student.institution,
    })
  ) {
  } else {
    student.info = 0;
  }

  return { meta_data, student };
}
