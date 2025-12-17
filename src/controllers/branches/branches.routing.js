import express from 'express';

import { add } from './add.action.js';
import { edit } from './edit.action.js';
import { getAllBranch, getOneBranch } from './list.action.js';

const router = express.Router();

// Add branch
router.post('/add', add);

// Get all branches
router.get('/', getAllBranch);

// Get single branch by id
router.get('/:id', getOneBranch);

// Update branch
router.put('/:id', edit);

export default router;
