module.exports = mongoose => {
  const Task = mongoose.model(
    "task",
    mongoose.Schema(
      {
        name: String,
        isDone: Boolean
      },
      { timestamps: true }
    )
  );

  return Task;
};