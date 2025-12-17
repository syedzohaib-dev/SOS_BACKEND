import User from '../../models/user.model.js'

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Already inactive
        if (user.status === 'In-Active') {
            return res.status(200).json({
                success: true,
                message: 'User already inactive',
            });
        }

        user.status = 'In-Active';
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'User successfully inactivated',
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete users',
            error: error.message,
        });
    }
};