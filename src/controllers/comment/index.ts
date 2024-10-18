import Comment from "../../models/comment.js";

export const createdComment = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const { article } = req.body;
    const params = {
      ...req.body,
      article,
      owner: userId,
    };
    const comment = await Comment.create(params);
    res.sendResponse(200, comment, "新增成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const getComments = async (req: any, res: any) => {
  try {
    const { article } = req.query;
    const params = {
      article,
    };
    const userId = req.user.id.toString();
    const comments = await Comment.find(params).lean();
    comments.forEach((comment: any) => {
      const likedBySet = new Set(
        comment.likedBy.map((id: any) => id.toString())
      );
      comment.isLike = likedBySet.has(userId);
    });
    res.sendResponse(200, comments, "查詢成功");
  } catch (err) {
    res.sendResponse(500, err);
  }
};

export const deleteComment = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const comment = await Comment.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    }).lean();
    if (!comment) {
      res.sendResponse(500, null, "評論未找到或你沒有權限刪除");
    } else {
      res.sendResponse(200, comment, "刪除成功");
    }
  } catch (e) {
    res.sendResponse(500, e);
  }
};

export const likeComment = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const userId = req.user.id;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.sendResponse(500, null, "未找到此評論");
    }
    const index = comment.likedBy.indexOf(userId);
    let isLike = false;
    if (index !== -1) {
      comment.likesCount -= 1;
      comment.likedBy.splice(index, 1);
    } else {
      comment.likesCount += 1;
      comment.likedBy.push(userId);
      isLike = true;
    }
    const changeLike = await comment.save();

    const response = {
      ...changeLike.toObject(),
      isLike,
    };

    res.sendResponse(200, response, isLike ? "評論點讚成功" : "取消評論點讚");
  } catch (e) {
    console.log(e);
    res.sendResponse(500, e);
  }
};

export const updatedComment = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const comment = await Comment.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );
    if (!comment) {
      res.sendResponse(500, null, "評論未找到或你沒有權限修改");
    } else {
      res.sendResponse(200, comment, "修改成功");
    }
  } catch (e) {
    res.sendResponse(500, e);
  }
};
