const { authJwt } = require("../middleware");
const notes = require("../controllers/note.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notes/getMyNotes", [authJwt.verifyToken], notes.findUserNotes);
  app.get("/api/notes/getNote/:id", [authJwt.verifyToken], notes.findOne);
  app.get(
    "/api/notes/getAllNotes",
    [authJwt.verifyToken, authJwt.isAdmin],
    notes.findAll
  );

  app.post("/api/notes/createNote", [authJwt.verifyToken], notes.create);
  app.post("/api/notes/updateNote", [authJwt.verifyToken], notes.update);
  app.post("/api/notes/deleteNote/:id", [authJwt.verifyToken], notes.delete);
};

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API endpoints for managing notes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *       example:
 *         title: Example Note
 *         content: This is an example note content.
 */

/**
 * @swagger
 * /api/notes/getMyNotes:
 *   get:
 *     summary: Get user's notes
 *     description: Retrieve notes associated with the authenticated user.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with user's notes.
 *       401:
 *         description: Unauthorized. Invalid token.
 */

/**
 * @swagger
 * /api/notes/getNote/{id}:
 *   get:
 *     summary: Get a specific note
 *     description: Retrieve a specific note by its ID.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with the requested note.
 *       401:
 *         description: Unauthorized. Invalid token.
 *       404:
 *         description: Note not found.
 */

/**
 * @swagger
 * /api/notes/getAllNotes:
 *   get:
 *     summary: Get all notes (admin only)
 *     description: Retrieve all notes. This endpoint is accessible only by admin users.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with all notes.
 *       401:
 *         description: Unauthorized. Invalid token.
 *       403:
 *         description: Forbidden. Only admin users have access.
 */

/**
 * @swagger
 * /api/notes/createNote:
 *   post:
 *     summary: Create a new note
 *     description: Create a new note for the authenticated user.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       201:
 *         description: Note created successfully.
 *       401:
 *         description: Unauthorized. Invalid token.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @swagger
 * /api/notes/updateNote:
 *   post:
 *     summary: Update a note
 *     description: Update an existing note for the authenticated user.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully.
 *       401:
 *         description: Unauthorized. Invalid token.
 *       404:
 *         description: Note not found.
 *       400:
 *         description: Bad request. Invalid input data.
 */

/**
 * @swagger
 * /api/notes/deleteNote/{id}:
 *   post:
 *     summary: Delete a note
 *     description: Delete an existing note by its ID for the authenticated user.
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the note to delete.
 *     responses:
 *       200:
 *         description: Note deleted successfully.
 *       401:
 *         description: Unauthorized. Invalid token.
 *       404:
 *         description: Note not found.
 */
