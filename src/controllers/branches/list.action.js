import Branch from '../../models/branches.model.js';

// GET Branches with optional Status, Search, Pagination
export const getAllBranch = async (req, res) => {
    try {
        const { search, status, page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let filter = {};

        // Status filter only if provided (Active / Inactive)
        if (status && (status === 'Active' || status === 'Inactive')) {
            filter.status = status;
        }

        // Search filter (Branch Code, Name, Area, Status)
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [
                { branchName: regex },
                { branchCode: regex },
                { area: regex },
                { status: regex },
            ];
        }

        const total = await Branch.countDocuments(filter);

        const branches = await Branch.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({
            success: true,
            total,
            page: pageNumber,
            limit: limitNumber,
            pages: Math.ceil(total / limitNumber),
            count: branches.length,
            data: branches,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch branches',
        });
    }
};


// getonebanch
export const getOneBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    const branch = await Branch.findById(branchId);

    if (!branch) {
      throw new Error("Branch not found");
    }

    return res.status(200).json({
      message: "Branch fetched successfully",
      branch,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching branch",
      error: error.message,
    });
  }
};