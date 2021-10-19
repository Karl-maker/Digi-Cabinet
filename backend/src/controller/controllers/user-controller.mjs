import service from "../../service/index.mjs";
import rateLimit from "express-rate-limit";

const TOP_ROUTE = "/user";

function controller(router) {
  return (req, res, next) => {
    router.get(`${TOP_ROUTE}/:id`, getUserById);
    //router.delete(`${TOP_ROUTE}/:id`, deleteUser);
    router.get(`${TOP_ROUTE}s/`, searchUsers);
    next();
  };
}

function searchUsers(req, res, next) {
  service.user
    .getManyByName(req)
    .then((results) => {
      res
        .status(200)
        .json({ users: results.users, meta_data: results.meta_data });
    })
    .catch((err) => {
      next(err);
    });
}

// function deleteUser(req, res, next) {
//   service.user
//     .delete(req)
//     .then((user) => {
//       res.status(200).json({ message: "You Have Deleted Your Account" });
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

function getUserById(req, res, next) {
  service.user
    .getByID(req)
    .then((results) => {
      res
        .status(200)
        .json({ user: results.user, meta_data: results.meta_data });
    })
    .catch((err) => {
      next(err);
    });
}

export default controller;
