import usersModel from "../model/usersModel";
import { sendOTP } from "../utils/notifications";


/*
getUserById
createUser
loginUser
activateUser
sendCode
verifyCode
resetPassword
updateUserInfo
deleteUser
*/
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getUserById = async (req: any, res: any) => {
  try {
    const result = await usersModel.getUserById(req.token.id);
    const token = usersModel.generateToken(result);
    res.status(200).json({
      message: "User information retrieved successfully",
      data: {user: result, token: token},
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: false
    });
  }
};

const register = async (req: any, res: any) => {
  try {
    const createdUser = await usersModel.createUser(req.body);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes
    await usersModel.createOTP(createdUser.id, otp, expiresAt);
    await sendOTP(createdUser.email, otp);

    res.status(200).json({
      message: "Code sent successfully",
      status: true,
      data: null,

    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false
    });
  }
};

const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const result = await usersModel.loginUser(email, password);
    if(result.is_deleted === true || result.is_email_verified === false){
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes
      await usersModel.createOTP(result.id, otp, expiresAt);
      await sendOTP(email, otp);
  
      res.status(200).json({
        message: "Code sent successfully",
        status: true,
        data: null,
  
      });
      return 
    }
    const token = usersModel.generateToken(result);
    res.status(200).json({
      message: "User logged in successfully",
      data: {user: result, token: token},
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false
    });
  }
};



const sendCode = async (req: any, res: any) => {
  const { email } = req.body;

  try {
    const result = await usersModel.sendCode(email);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes
    await usersModel.createOTP(result.id, otp, expiresAt);
    await sendOTP(email, otp);

    res.status(200).json({
      message: "Code sent successfully",
      status: true,
      data: null,

    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false });
  }
};

const verifyCode = async (req: any, res: any) => {
  const { email, code } = req.body;

  try {
    const otpData = await usersModel.verifyCode(email, code);
    if (!otpData) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (new Date() > new Date(otpData?.otp?.expires_at)) {
      return res.status(401).json({ error: "OTP has expired" });
    }

   await usersModel.markOtpAsUsed(otpData?.otp?.otp_id);
    const token = usersModel.generateToken(otpData?.user, "10m");
    res.status(200).json({
      message: "Code verified successfully",
      data: {
        token: token,
      },
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false
    });
  }
};

const resetPassword = async (req: any, res: any) => {
  const {password } = req.body;
  const userId = req.token.id;
  try {
    const result = await usersModel.resetPassword(userId, password);
    const token = usersModel.generateToken(result);
    res.status(200).json({
      message: "Password reset successfully",
      data: {user: result, token: token},
      status: true
    });
  } catch (error: any) {  
    res.status(500).json({
      message: error.message,
      data: null,
      status: false
    });
  }
};

const updateUserInfo = async (req: any, res: any) => {
  const { id, first_name, last_name, phone_number, password } = req.body;

  try {
    const result = await usersModel.updateUserInfo(id, { first_name, last_name, phone_number, password });
    const token = usersModel.generateToken(result);
    res.status(200).json({
      message: "User updated successfully",
      data: {user: result, token: token},
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null,
      status: false
    });
  }
};

const deleteUser = async (req: any, res: any) => {
  const { id } = req.token;

  try {
    const result = await usersModel.deActivateUser(id);
    res.status(200).json({
      message: "User deleted successfully",
      data: result, 
      status: true
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      data: null, 
      status: false
    });
  }
};



export  {
  getUserById,
  register,
  login,
  sendCode,
  verifyCode,
  resetPassword,
  updateUserInfo,
  deleteUser
};  

