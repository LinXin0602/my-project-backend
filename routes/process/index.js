const express = require("express");
const route = express.Router();
const processController = require("../../controllers/process");

/**
 * @swagger
 * tags:
 *  name: process
 *  description: 'process APIs'
 */

/**
 * @swagger
 * /api/process/login:
 *   post:
 *     summary: Create a new user
 *     tags: [process]
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

route.post("/login", processController.login);

module.exports = route;
