const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users");

/**
 * @swagger
 * tags:
 *  name: users
 *  description: '管理USER的 API'
 */

/**
 * @swagger
 * /api/users/getAllUsers:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [users]
 
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Error retrieving users
 */
router.get("/getAllUsers", userController.getAllUsers);

/**
 * @swagger
 * /api/users/createUser:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - account
 *               - password
 *             properties:
 *               account:
 *                 type: string
 *                 description: The user's account
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */
router.post("/createUser", userController.createUser);

/**
 * @swagger
 *  :
 *   get:
 *     summary: Retrieve the profile of a user
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       500:
 *         description: Error retrieving user profile
 */
router.get("/getUserProfile", userController.getUserProfile);

/**
 * @swagger
 * /api/users/deleteUser:
 *   delete:
 *     summary: Delete a user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       500:
 *         description: Error deleting user
 */
router.delete("/deleteUser", userController.deleteUser);

/**
 * @swagger
 * /api/users/updateUser:
 *   patch:
 *     summary: Update a user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The user ID
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Error updating user
 */
router.patch("/updateUser", userController.updateUser);

module.exports = router;
