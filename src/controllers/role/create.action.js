import roleModel from '../../models/role.model.js';

const create = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }
        const existingRole = await roleModel.findOne({ title });
        if (existingRole) {
            return res.status(400).json({ success: false, message: 'Role with this title already exists' });
        }

        await roleModel.create({
            title,
        });
        return res.status(201).json({ success: true, message: 'Role created successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};
export default create;
