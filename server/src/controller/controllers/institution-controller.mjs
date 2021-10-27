import service from "../../service/index.mjs";
import { protect } from "../../middleware/authorization.mjs";

const TOP_ROUTE = "/institution";

function controller(router) {
  return (req, res, next) => {
    router.get(`${TOP_ROUTE}/:id`, getInstitutionById);
    router.get(`${TOP_ROUTE}s/`, searchInstitution);
    router.delete(`${TOP_ROUTE}/:id`, protect, deleteInstitution);
    router.post(`${TOP_ROUTE}/`, protect, createInstitution);
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
      res.status(200).json({ results: results.institution });
    })
    .catch((err) => {
      next(err);
    });
}

function searchInstitution(req, res, next) {
  service.institution
    .getAllByName(req)
    .then((results) => {
      res
        .status(200)
        .json({ results: results.institutions, meta_data: results.meta_data });
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
