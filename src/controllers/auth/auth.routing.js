import { add } from './add.action.js';
import { login } from './login.action.js';
import { update } from './update.action.js';
import { ROLE } from '../../common/role.js'
import { auth, role } from '../../middlewares/auth.js'
import { forgotPassword } from './forgotPass.action.js';
import { resetPassword } from './resetPass.action.js';
import { verifyOTP } from './verifyOtp.action.js';

module.exports = {
    '/add-user': {
        post: {
            middleware : [auth , role(ROLE.ADMIN)],
            action: add,
        },
    },
    '/login': {
        post: {
            action: login,
        },
    },
    '/forgot-password': {
        post: {
            action: forgotPassword,
        },
    },
    '/verify-otp': {
        post: {
            action: verifyOTP,
        },
    },
    '/reset-password': {
        post: {
            action: resetPassword,
        },
    },
    '/:id' : {
        put: {
            middlewares : [auth],
            action: update,
        },
    }
};
