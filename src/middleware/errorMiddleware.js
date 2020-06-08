router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({ message: err.message, success: false });
});
