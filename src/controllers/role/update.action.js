import roleModel from '../../models/role.model.js';

const update = async (req, res) => {
    try {
        const { roleId } = req.params;
        const { title } = req.body;
        await roleModel.findByIdAndUpdate(roleId, { title }, { new: true });
        return res.status(200).json({ success: true, message: 'Role updated successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};
export default update;
