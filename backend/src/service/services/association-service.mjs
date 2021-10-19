import { db } from "../../helper/db.mjs";
import config from "../../config/config.mjs";

export default { createAssociation, isAdmin };

async function isAdmin(req) {
  const user = req.user;
  const institution = req.body.institution;

  if (
    await db.association.exists({
      institution: institution,
      user: user._id,
      is_admin: 1,
    })
  ) {
    return true;
  } else {
    throw { name: "UnauthorizedError", message: "Not Administration" };
  }
}

//----------NON-ROUTE-FUNCTIONS--------------

async function createAssociation(details) {
  try {
    await db.association.create(details);
  } catch (err) {
    throw { name: "UnexpectedError" };
  }

  return true;
}
