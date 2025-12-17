import userModel from "../../models/user.model.js";


export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
