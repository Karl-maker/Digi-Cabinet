import service from "../../service/index.mjs";

const TOP_ROUTE = "/student";

function controller(router) {
  return (req, res, next) => {
    router.get(`${TOP_ROUTE}/:id`, getStudentById);
    router.delete(`${TOP_ROUTE}/:id`, deleteStudent);
    router.post(`${TOP_ROUTE}/`, createStudent);
    router.get(`${TOP_ROUTE}s/`, searchStudent);
    next();
  };
}

export default controller;
