import { db } from "../../helper/db.mjs";
import config from "../../config/config.mjs";

export default { createUnprotected, isAdmin, isAdminUnprotected };

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

async function createUnprotected(details) {
  try {
    await db.association.create(details);
  } catch (err) {
    throw { name: "UnexpectedError" };
  }

  return true;
}

async function isAdminUnprotected(details) {
  const user = details.user;
  const institution = details.institution;

  if (
    await db.association.exists({
      institution: institution,
      user: user,
      is_admin: 1,
    })
  ) {
    return true;
  } else {
    return false;
  }
}
