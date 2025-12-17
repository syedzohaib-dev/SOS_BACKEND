import roleModel from '../../models/role.model.js';

const list = async (req, res) => {
    try {
        const data = await roleModel.find({});
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error?.message });
    }
};

export default list;
