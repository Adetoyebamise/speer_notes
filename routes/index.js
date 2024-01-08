const userRoutes = require("./userRoutes");

const router = (app) => {
      app.use("/api", userRoutes);
};

module.exports = router