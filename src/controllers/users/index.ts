import User from "../../models/user";
import bcrypt from "bcryptjs";

export const createUser = async (req: any, res: any) => {
  try {
    const { password, account } = req.body;
    const existingUser = await User.findOne({ account });

    if (existingUser) {
      return res.sendResponse(500, null, "此帳號已經存在");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const params = { ...req.body, password: hashedPassword, approved: true };
    const newUser = await User.create(params);

    const {
      password: _,
      approved: __,
      ...userWithoutSensitiveFields
    } = newUser.toObject();
    res.sendResponse(200, userWithoutSensitiveFields, "成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({ approved: true }).select(
      "-approved -password"
    );
    res.sendResponse(200, users, "成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const getUserProfile = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const user = await User.findById(id).select("-approved -password");

    if (!user) {
      return res.sendResponse(404, null, "查無此用戶");
    }

    res.sendResponse(200, user, "成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.sendResponse(404, null, "用戶未找到");
    }

    res.sendResponse(200, user, "刪除成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id, password, ...updateFields } = req.body;

    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).select("-approved -password");

    if (!user) {
      return res.sendResponse(404, null, "用戶未找到");
    }

    res.sendResponse(200, user, "修改成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const auditUser = async (req: any, res: any) => {
  try {
    const { id, approved } = req.body;

    if (approved) {
      const user = await User.findByIdAndUpdate(
        id,
        { approved },
        {
          new: true,
          runValidators: true,
        }
      ).select("-approved -password");

      return res.sendResponse(200, user, "審核通過");
    } else {
      const user = await User.findByIdAndDelete(id);
      return res.sendResponse(200, user, "審核不通過");
    }
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const getUnauditedUsers = async (req: any, res: any) => {
  try {
    const users = await User.find({ approved: false }).select(
      "-approved -password"
    );
    res.sendResponse(200, users, "查詢成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};
