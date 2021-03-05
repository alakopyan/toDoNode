module.exports = mongoose => {
  const Task = mongoose.model(
    "task",
    mongoose.Schema(
      {
        title: String,
        isDone: Boolean
      },
      { timestamps: true }
    )
  );

  return Task;
};
