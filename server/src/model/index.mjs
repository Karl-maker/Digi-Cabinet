/*

All models meet here..

*/

import user from "./models/user-model.mjs";
import student from "./models/student-model.mjs";
import institution from "./models/institution-model.mjs";
import subject from "./models/subject-model.mjs";
import association from "./models/association-model.mjs";
import group from "./models/group-model.mjs";
import _class from "./models/class-model.mjs";
import assessment from "./models/assessment-model.mjs";
import misdemeanor from "./models/misdemeanor-model.mjs";
import result from "./models/result-model.mjs";
import authentication from "./models/authentication-model.mjs";

export default {
  user,
  student,
  institution,
  subject,
  association,
  group,
  class: _class,
  assessment,
  misdemeanor,
  result,
  authentication,
};
