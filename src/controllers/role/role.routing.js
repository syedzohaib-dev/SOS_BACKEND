import { ROLE } from '../../common/role.js';
import { auth, role } from '../../middlewares/auth.js';
import create from './create.action.js';
import list from './list.action.js';
import update from './update.action.js';
import remove from './remove.action.js';

module.exports = {
    '/': {
        get: {
            action: list,
        },
    },
    '/create': {
        post: {
            middlewares: [auth, role(ROLE.MC_MEMBER)],
            action: create,
        },
    },
    '/:roleId': {
        put: {
            middlewares: [auth, role(ROLE.MC_MEMBER)],
            action: update,
        },
    },
    '/:id': {
        delete: {
            middlewares: [auth, role(ROLE.MC_MEMBER)],
            action: remove,
        },
    },
};
