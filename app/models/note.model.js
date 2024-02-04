module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("notes", {
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
  });

  return Note;
};
