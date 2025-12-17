import { auth } from "../../middlewares/auth";
import { deleteUser } from "./delete.action";
import { getSingleUser, getUsers } from "./list.action";

module.exports = {
    '/': {
        get: {
            middleware: [auth],
            action: getUsers
        }
    },
    '/:id': {
        get: {
            action: getSingleUser,
        },
    },
    'delete/:id': {
        delete: {
            action: deleteUser,
        },
    },
}