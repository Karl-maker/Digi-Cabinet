import service from "../../service/index.mjs";
import { protect } from "../../middleware/authorization.mjs";

const TOP_ROUTE = "/student";

function controller(router) {
  return (req, res, next) => {
    router.get(`${TOP_ROUTE}/:id`, getStudentById);
    router.delete(`${TOP_ROUTE}/:id`, protect, deleteStudent);
    router.post(`${TOP_ROUTE}/`, protect, checkIfAdmin, createStudent);
    router.get(`${TOP_ROUTE}s/`, searchStudent);
    next();
  };
}

function getStudentById(req, res, next) {
  service.student
    .getById(req)
    .then((results) => {
      res.status(200).json({ results: results.student });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteStudent(req, res, next) {}

function searchStudent(req, res, next) {
  service.student
    .getAllByName(req)
    .then(({ students }) => {
      res.status(200).json({ results: students });
    })
    .catch((err) => next(err));
}

function checkIfAdmin(req, res, next) {
  service.association
    .isAdmin(req)
    .then(() => next())
    .catch((err) => next(err));
}

function createStudent(req, res, next) {
  service.student
    .create(req)
    .then((student) => {
      res.status(200).json({ student });
    })
    .catch((err) => next(err));
}

export default controller;
