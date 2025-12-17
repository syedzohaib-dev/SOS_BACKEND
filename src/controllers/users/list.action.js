import User from '../../models/user.model.js';
import Branch from '../../models/branches.model.js';
import Role from '../../models/role.model.js'

export const getUsers = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            type = 'all',   // branch-head -- area-manager -- all
            search = '',
        } = req.query;

        const skip = search ? 0 : (page - 1) * limit;

        const allowedTypes = ['branch-head', 'area-manager', 'all'];

        if (!allowedTypes.includes(type)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid type value',
            });
        }
        let userFilter = {};

        if (type === 'branch-head') {
            const role = await Role.findOne({ title: 'Branch-Head' });
            if (role) userFilter.roleTitle = role._id;
        }
        if (type === 'area-manager') {
            const role = await Role.findOne({ title: 'Area-Manager' });
            if (role) userFilter.roleTitle = role._id;
        }

        let branchUserIds = [];

        if (search) {
            const branches = await Branch.find({
                $or: [
                    { branchCode: { $regex: search, $options: 'i' } },
                    { branchName: { $regex: search, $options: 'i' } },
                    { area: { $regex: search, $options: 'i' } },
                ],
            }).select('branchHead areaManager');

            branches.forEach((b) => {
                // if (b.branchHead) branchUserIds.push(b.branchHead);
                // if (b.areaManager) branchUserIds.push(b.areaManager);

                if (type === 'branch-head' && b.branchHead) {
                    branchUserIds.push(b.branchHead);
                }

                if (type === 'area-manager' && b.areaManager) {
                    branchUserIds.push(b.areaManager);
                }

                if (type === 'all') {
                    if (b.branchHead) branchUserIds.push(b.branchHead);
                    if (b.areaManager) branchUserIds.push(b.areaManager);
                }

            });
        }

        let searchFilter = {};

        if (search) {
            searchFilter = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    ...(branchUserIds.length
                        ? [{ _id: { $in: branchUserIds } }]
                        : []),
                ],
            };
        }

        const finalFilter = {
            ...userFilter,
            ...(search ? searchFilter : {}),
        };

        let populateArr = [
            { path: 'roleTitle' }
        ];

        if (type === 'branch-head') {
            populateArr.push({
                path: 'branchHead',
                select: '_id branchName branchCode branchSchedule status',
            });
        }

        if (type === 'area-manager') {
            populateArr.push({
                path: 'areaManager',
                select: '_id branchName branchCode branchSchedule status',
            });
        }

        if (type === 'all') {
            populateArr.push(
                {
                    path: 'branchHead',
                    select: '_id branchName branchCode branchSchedule status',
                },
                {
                    path: 'areaManager',
                    select: '_id branchName branchCode branchSchedule status',
                }
            );
        }

        const users = await User.find(finalFilter)
            .populate(populateArr)
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });


        const total = await User.countDocuments(finalFilter);

        return res.status(200).json({
            success: true,
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
            data: users,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message,
        });
    }
};




export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id)
            .populate('role');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error.message,
        });
    }
};