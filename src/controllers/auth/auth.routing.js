import express from 'express';

import { add } from './add.action.js';
import { login } from './login.action.js';
import { update } from './update.action.js';
import { forgotPassword } from './forgotPass.action.js';
import { resetPassword } from './resetPass.action.js';
import { verifyOTP } from './verifyOtp.action.js';

import { ROLE } from '../../common/role.js';
import { auth, role } from '../../middlewares/auth.js';

const router = express.Router();

// Create user (Admin only)
router.post(
  '/add-user',
  auth,
  role(ROLE.ADMIN),
  add
);

// Login
router.post('/login', login);

// Forgot password
router.post('/forgot-password', forgotPassword);

// Verify OTP
router.post('/verify-otp', verifyOTP);

// Reset password
router.post('/reset-password', resetPassword);

// Update user
router.put('/:id', auth, update);

export default router;
