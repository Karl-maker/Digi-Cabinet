import { db } from "../../helper/db.mjs";
import config from "../../config/config.mjs";

export default { createAssociation };

//----------NON-ROUTE-FUNCTIONS--------------

async function createAssociation(details) {
  try {
    await db.association.create(details);
  } catch (err) {
    throw { name: "UnexpectedError" };
  }

  return true;
}
