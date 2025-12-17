import express from 'express';

import { auth } from '../../middlewares/auth.js';
import { deleteUser } from './delete.action.js';
import { getSingleUser, getUsers } from './list.action.js';

const router = express.Router();

// Get all users (protected)
router.get('/', getUsers);

// Get single user by id
router.get('/:id', getSingleUser);

// Delete user
router.delete('/delete/:id', deleteUser);

export default router;
