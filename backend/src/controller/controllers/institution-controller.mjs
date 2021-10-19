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

function deleteInstitution(req, res, next) {
  service.institution
    .delete(req)
    .then(() => {
      res.status(200).json({ message: "Institution Deleted" });
    })
    .catch((err) => {
      next(err);
    });
}

function getInstitutionById(req, res, next) {
  service.institution
    .getById(req)
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((err) => {
      next(err);
    });
}

function searchInstitution(req, res, next) {
  service.institution
    .getManyByName(req)
    .then((results) => {
      res.status(200).json({ results });
    })
    .catch((err) => {
      next(err);
    });
}

function createInstitution(req, res, next) {
  service.institution
    .create(req)
    .then((results) => {
      res.status(200).json({
        message: "Institution Created Successfully",
        results: results,
      });
    })
    .catch((err) => {
      next(err);
    });
}

export default controller;
