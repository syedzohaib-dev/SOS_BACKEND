import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/generateToken.js';

export const login = async (req, res) => {
  try {
    const { email , password} = req.body;

    const user = await User
      .findOne({ email })
      .select('+password')
      .populate('roleTitle', "title");
    
    if (!user) {
      res.status(400);
      throw new Error('Invalid email or password');
    }

    if (user.status === 'In-Active') {
      res.status(403);
      throw new Error('Your account is inactive. Please contact admin.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400);
      throw new Error('Invalid email or password');
    }

    res.json({
      message: 'Login successful',
      token: generateToken(user),
      user: {
        id : user._id,
        name : user.name,
        email : user.email,
        roleTitle : user.roleTitle.title
      },
    });
  } catch (error) {
    console.log("error in login", error.message);
    res.status(500).json({ error: error.message });
  }
};
