/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import User from '../../models/user.model.js';
import Branch from '../../models/branches.model.js';
import { ROLE } from '../../common/role.js';
import Role from '../../models/role.model.js';

export const update = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        const updateData = { ...req.body };
        const { branchIds } = req.body;
        const currentUserRole = req.user?.roleTitle?.title;
        const restrictedFields = ['email', 'password', 'roleTitle', 'status', 'branchIds'];

        if (updateData.roleTitle) {
            const role = await Role.findOne({ title: updateData.roleTitle });
            if (!role) {
                throw new Error("Invalid role");
            }
            updateData.roleTitle = role._id
        }

        // ❌ Non-admin restrictions
        if (currentUserRole !== ROLE.ADMIN) {
            restrictedFields.forEach((field) => delete updateData[field]);
        }
        // 🟢 Update user
        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, session }
        ).populate('roleTitle');

        if (!user) {
            throw new Error('User not found');
        }

        // =========================
        // 🔹 ADMIN + BRANCH LOGIC
        // =========================
        if (currentUserRole === ROLE.ADMIN && branchIds) {

            // 🔴 Branch-Head → ONLY ONE BRANCH
            if (user.roleTitle.title === 'Branch-Head') {
                if (branchIds.length !== 1) {
                    throw new Error('Branch-Head has just one branch allowed');
                }

                // 🔹 remove from old branch (sirf aik hi hogi)
                await Branch.findOneAndUpdate(
                    { branchHead: user._id },
                    { $unset: { branchHead: '' } },
                    { session }
                );

                // 🔹 assign new branch
                await Branch.findByIdAndUpdate(
                    branchIds[0],
                    { branchHead: user._id },
                    { session }
                );
            }

            // 🔴 Area-Manager → multiple branches (NO REMOVE)
            if (user.roleTitle.title === 'Area-Manager') {
                if (branchIds.length <= 1) {
                    throw new Error('Area-Manager must have more than one branch');
                }

                await Branch.updateMany(
                    { _id: { $in: branchIds } },
                    { areaManager: user._id },
                    { session }
                );
            }
        }

        // ✅ COMMIT
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: 'User updated successfully',
            user,
        });

    } catch (error) {
        // ❌ ROLLBACK
        await session.abortTransaction();
        session.endSession();

        return res.status(400).json({
            message: error.message,
        });
    }
};