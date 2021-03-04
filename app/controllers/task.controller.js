const db = require("../models");
const Task = db.tasks;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const task = new Task({
    name: req.body.name,
    isDone: false,
  });

  task
    .save(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Task.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving task.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Task with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Task with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Task with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      } else {
        res.send({
          message: "Task was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Task.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tasks were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tasks.",
      });
    });
};

exports.findAllDone = (req, res) => {
  Task.find({ isDone: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};
