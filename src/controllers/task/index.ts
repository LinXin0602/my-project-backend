import Task from "../../models/task";
import User from "../../models/user";

export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.user.id;
    const params = {
      title,
      description: description || "",
      status,
      owner: userId,
    };
    const newTask = await Task.create(params);
    res.sendResponse(200, newTask, "任務創建成功");
  } catch (e) {
    console.error(e);
    res.sendResponse(500, null);
  }
};

export const getUserTasks = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const params = {
      owner: userId,
    };
    const tasksData = await Task.find(params).lean();
    const user = await User.findById(userId).lean();

    if (user) {
      const { password, ...userWithoutPassword } = user;
      const tasksWithUser = tasksData.map((task: any) => {
        const { owner, ...taskWithoutOwner } = task;
        return {
          ...taskWithoutOwner,
          user: userWithoutPassword,
        };
      });
      res.sendResponse(200, tasksWithUser, "查詢成功");
    } else {
      res.sendResponse(404, null, "用戶未找到");
    }
  } catch (e) {
    console.error(e);
    res.sendResponse(500, null);
  }
};

export const getSingleTask = async (req: any, res: any) => {
  try {
    const { id } = req.query;
    const userId = req.user.id;
    const params = {
      owner: userId,
      _id: id,
    };
    const taskData = await Task.findOne(params).lean();
    const user = await User.findById(userId).lean();

    if (taskData && user) {
      const { password, ...userWithoutPassword } = user;
      const { owner, ...taskWithoutOwner } = taskData;

      const response = {
        ...taskWithoutOwner,
        user: userWithoutPassword,
      };
      res.sendResponse(200, response, "查詢成功");
    } else {
      res.sendResponse(404, null, "任務或用戶未找到");
    }
  } catch (e) {
    console.error(e);
    res.sendResponse(500, null);
  }
};

export const deleteTask = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const taskData = await Task.findOneAndDelete({ _id: id });

    if (taskData) {
      res.sendResponse(200, taskData, "刪除成功");
    } else {
      res.sendResponse(404, null, "任務未找到");
    }
  } catch (e) {
    console.error(e);
    res.sendResponse(500, null);
  }
};

export const updateTask = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const params = {
      ...req.body,
    };
    const task = await Task.findByIdAndUpdate(id, params, {
      new: true,
      runValidators: true,
    });

    if (task) {
      res.sendResponse(200, task, "修正成功");
    } else {
      res.sendResponse(404, null, "任務未找到");
    }
  } catch (e) {
    console.log(e);
    res.sendResponse(500, e);
  }
};
