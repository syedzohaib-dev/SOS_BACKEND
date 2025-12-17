import Branch from "../../models/branches.model.js";

export const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const { branchCode, branchName, dailySadqaMSL, area, status, branchSchedule } = req.body;

        if (!branchCode || !branchName || !dailySadqaMSL || !area || !status || !branchSchedule) {
            return res.status(400).json({
                success: false,
                message: "branchCode, branchName, dailySadqaMSL, area, status and branchSchedule are required",
            });
        }

        if (
            !Array.isArray(branchSchedule.days) ||
            branchSchedule.days.length === 0 ||
            !branchSchedule.openTime ||
            !branchSchedule.closeTime
        ) {
            return res.status(400).json({
                success: false,
                message: "branchSchedule must include days array, openTime and closeTime",
            });
        }

        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({
                success: false,
                message: "Branch not found",
            });
        }

        const existCode = await Branch.findOne({
            branchCode,
            _id: { $ne: id }
        });

        if (existCode) {
            return res.status(409).json({
                success: false,
                message: "Branch code already exists",
            });
        }

        branch.branchCode = branchCode;
        branch.branchName = branchName;
        branch.dailySadqaMSL = dailySadqaMSL;
        branch.area = area;
        branch.status = status;
        branch.branchSchedule = {
            days: branchSchedule.days,
            openTime: branchSchedule.openTime,
            closeTime: branchSchedule.closeTime,
        };

        await branch.save();

        return res.status(200).json({
            success: true,
            message: "Branch updated successfully",
            data: branch,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update branch",
            error: error.message
        });
    }
};
