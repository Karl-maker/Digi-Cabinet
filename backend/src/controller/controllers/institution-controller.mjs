import service from "../../service/index.mjs";

const TOP_ROUTE = "/institution";

function controller(router) {
  return (req, res, next) => {
    router.get(`${TOP_ROUTE}/:id`, getInstitutionById);
    router.delete(`${TOP_ROUTE}/:id`, deleteInstitution);
    router.post(`${TOP_ROUTE}/`, createInstitution);
    router.get(`${TOP_ROUTE}s/`, searchInstitution);
    next();
  };
}

export default controller;
