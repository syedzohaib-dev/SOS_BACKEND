import express from 'express';

import { ROLE } from '../../common/role.js';
import { auth, role } from '../../middlewares/auth.js';

import create from './create.action.js';
import list from './list.action.js';
import update from './update.action.js';
import remove from './remove.action.js'; // ✅ FIXED

const router = express.Router();

// Get all roles
router.get('/', list);

// Create role (MC Member only)
router.post(
    '/create',
    auth,
    role(ROLE.MC_MEMBER),
    create
);

// Update role
router.put(
    '/:roleId',
    auth,
    role(ROLE.MC_MEMBER),
    update
);

// Delete role
router.delete(
    '/:id',
    auth,
    role(ROLE.MC_MEMBER),
    remove
);

export default router;
