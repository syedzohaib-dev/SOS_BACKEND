import { add } from './add.action.js';
import { edit } from './edit.action.js';
import { getAllBranch , getOneBranch } from './list.action.js'

module.exports = {
    '/add': {
        post: {
            action: add
        }
    },
    '/:id': {
        post: {
            action: edit
        }
    },
    '/': {
        get: {
            action: getAllBranch
        }
    },
    '/:branchId': {
        get: {
            action: getOneBranch
        }
    },
}