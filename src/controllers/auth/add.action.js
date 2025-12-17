import mongoose from "mongoose";
import User from "../../models/user.model.js";
import Role from "../../models/role.model.js";
import Branch from "../../models/branches.model.js";
import bcrypt from "bcryptjs";

export const add = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, roleTitle, status, branchIds } = req.body;

    if (!name || !email || !password || !roleTitle || !branchIds) {
      throw new Error("Required fields missing");
    }

    const userExists = await User.findOne({ email }).session(session);
    if (userExists) {
      throw new Error("User already exists");
    }

    const role = await Role.findOne({ title: roleTitle });
    if (!role) {
      throw new Error("Invalid role");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role._id,
      status,
    });

    await user.save({ session });

    if (role.title === "Branch-Head") {
      if (branchIds.length !== 1) {
        throw new Error("Branch-Head has just one branch allowed");
      }

      await Branch.findByIdAndUpdate(
        branchIds[0],
        { branchHead: user._id },
        { session }
      );
    }

    if (role.title === "Area-Manager") {
      if (branchIds.length <= 1) {
        throw new Error("Area-Manager must have more than one branch");
      }

      await Branch.updateMany(
        { _id: { $in: branchIds } },
        { areaManager: user._id },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: role.title,
        status: user.status,
        branches: branchIds,
      },
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    return res.status(400).json({
      message: error.message || "Something went wrong",
    });
  }
};
