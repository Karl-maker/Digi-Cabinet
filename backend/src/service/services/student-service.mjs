import { db } from "../../helper/db.mjs";

export default {
  create,
  getAllByName,
  getById,
};

async function create(req) {
  var student;
  const user = req.user;
  const {
    first_name,
    middle_name,
    last_name,
    house,
    contact_info_email,
    contact_info_number,
    institution,
  } = req.body;

  student = await db.student.create({
    first_name,
    middle_name,
    last_name,
    house,
    contact_info: { email: contact_info_email, number: contact_info_number },
    institution,
  });

  return student;
}

async function getAllByName(req) {}

async function getById(req) {}
