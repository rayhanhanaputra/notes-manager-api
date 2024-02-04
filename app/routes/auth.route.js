const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/refreshtoken", controller.refreshToken);
  app.delete("/api/auth/revoketoken", controller.revokeToken);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         role (optional):
 *           type: string
 *           description: The role of the user ["admin", "user"]. Default is user
 *       example:
 *         username: john_doe
 *         email: john@example.com
 *         password: strongPassword123
 *         role: "user"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: john_doe
 *         password: strongPassword123
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - Username or email already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: User login
 *     description: Log in with existing credentials
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       404:
 *         description: Not Found - User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/refreshtoken:
 *   post:
 *     summary: Refresh user token
 *     description: Refresh the user token to extend the session
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/revoketoken:
 *   delete:
 *     summary: Delete user token
 *     description: Delete the user token to log out
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       204:
 *         description: Token deleted successfully
 *       401:
 *         description: Unauthorized - Invalid token
 *       500:
 *         description: Internal server error
 */
