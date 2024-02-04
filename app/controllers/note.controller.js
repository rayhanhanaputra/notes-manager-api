const db = require("../models");
const Note = db.note;
const User = db.user;
const Op = db.Sequelize.Op;

const validator = require("validator");
const winston = require("winston");
const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
  ],
});

exports.create = async (req, res) => {
  // Validate request
  if (
    !validator.isLength(req.body.title, { min: 1 }) ||
    !validator.isLength(req.body.content, { min: 1 })
  ) {
    return res.status(400).send({
      message: "Title and content cannot be empty!",
    });
  }

  const userId = req.userId; // Assuming the user ID is in the token

  // Find the user by their ID
  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(404).send({
      message: "User not found.",
    });
  }

  // Create a Tutorial
  const note = {
    title: req.body.title,
    content: req.body.content,
    userId: user.id,
  };

  // Save Tutorial in the database
  Note.create(note)
    .then((data) => {
      res.json({ message: "Successfully added new notes!", data });
      logger.info(
        "Added new note with title: " +
          req.body.title +
          " by userId: " +
          user.id
      );
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Note.findAll({ where: condition })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

exports.findUserNotes = async (req, res) => {
  const title = req.query.title;
  const userId = req.userId; // Assuming the user ID is in the token

  var condition = title
    ? {
        title: { [Op.like]: `%${title}%` },
      }
    : {};

  // Add condition to filter by userId
  condition.userId = userId;

  try {
    const notes = await Note.findAll({ where: condition });
    res.json(notes);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user notes.",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId; // Assuming the user ID is in the token

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).send({
        message: `Cannot find Note with id=${id}.`,
      });
    }

    // Check if the user is the owner of the note or is an admin
    if (note.userId !== userId && req.userRole !== "admin") {
      return res.status(403).send({
        message: "Forbidden! You do not have permission to access this note.",
      });
    }

    res.send(note);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Note with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.body.id;
  const userId = req.userId; // Assuming the user ID is in the token

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).send({
        message: `Cannot update Note with id=${id}. Note not found!`,
      });
    }

    // Check if the user is the owner of the note or is an admin
    if (note.userId !== userId && req.userRole !== "admin") {
      return res.status(403).send({
        message: "Forbidden! You do not have permission to update this note.",
      });
    }

    const [num] = await Note.update(req.body, {
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Note was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Note with id=${id}. Maybe Note was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating Note with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId; // Assuming the user ID is in the token

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).send({
        message: `Cannot delete Note with id=${id}. Note not found!`,
      });
    }

    // Check if the user is the owner of the note or is an admin
    if (note.userId !== userId && req.userRole !== "admin") {
      return res.status(403).send({
        message: "Forbidden! You do not have permission to delete this note.",
      });
    }

    await Note.destroy({
      where: { id: id },
    });

    res.send({
      message: "Note was deleted successfully!",
    });
    logger.info("deleted note " + id + "by userId " + user.id);
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Note with id=" + id,
    });
  }
};
