const Task = require("../models/task");
const User = require("../models/user");
exports.createTask = async (req, res) => {
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
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const params = {
      owner: userId,
    };
    let tasksData = await Task.find(params).lean();
    const user = await User.findById(userId).lean();
    delete user.password;
    tasksData = tasksData.map((task) => {
      delete task.owner;
      return {
        ...task,
        user,
      };
    });
    res.sendResponse(200, tasksData, "查詢成功");
  } catch (e) {
    console.error(e);
    req.sendResponse(500, null);
  }
};
exports.getSingleTask = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.user.id;
    const params = {
      owner: userId,
      _id: id,
    };
    let taskData = await Task.findOne(params).lean();
    const user = await User.findById(userId).lean();
    delete user.password;
    delete taskData.owner;
    taskData = {
      ...taskData,
      user,
    };

    res.sendResponse(200, taskData, "查詢成功");
  } catch (e) {
    console.error(e);
    req.sendResponse(500, null);
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const params = {
      _id: id,
    };
    const taskData = await Task.findOneAndDelete(params);
    res.sendResponse(200, taskData, "刪除成功");
  } catch (e) {
    res.sendResponse(500, null);
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.body;
    const params = {
      ...req.body,
    };
    const task = await Task.findByIdAndUpdate(id, params, {
      new: true,
      runValidators: true,
    });
    res.sendResponse(200, task, "修正成功");
  } catch (e) {
    console.log(e);
    res.sendResponse(500, e);
  }
};
