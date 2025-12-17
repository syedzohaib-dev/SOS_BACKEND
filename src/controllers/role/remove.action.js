import roleModel from '../../models/role.model.js';

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await roleModel.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Role removed successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};

export default remove
