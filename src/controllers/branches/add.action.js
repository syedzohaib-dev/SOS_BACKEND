import Branch from "../../models/branches.model.js";

export const add = async (req, res) => {
    try {
        const { branchCode, branchName, dailySadqaMSL, area, status, branchSchedule } = req.body;
 
        if (!branchCode || !branchName || !dailySadqaMSL || !area || !status) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields" 
            });
        }

        if (!branchSchedule) {
            return res.status(400).json({
                success: false,
                message: "Branch schedule is required"
            });
        }

        const { days, openTime, closeTime } = branchSchedule;

        if (!days || !Array.isArray(days) || days.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Days must be a non-empty array"
            });
        }

        if (!openTime || !closeTime) {
            return res.status(400).json({
                success: false,
                message: "Open time and close time are required"
            });
        }

        const existCode = await Branch.findOne({ branchCode });

        if (existCode) {
            return res.status(409).json({
                success: false,
                message: "Branch code already exists",
            });
        }

        const branch = await Branch.create({
            branchCode,
            branchName,
            dailySadqaMSL,
            area,
            status,
            branchSchedule
        });

        return res.status(201).json({
            success: true,
            message: "Branch added successfully",
            data: branch
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add branch",
            error: error.message
        });
    }
};
