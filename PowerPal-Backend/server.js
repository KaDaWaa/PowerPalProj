const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const run = async () => {
  try {
    const port = process.env.PORT || 3001;
    await mongoose.connect(
      process.env.DB_URL || "mongodb+srv://segev1278:Segev9191@cluster0.gl00oai.mongodb.net/PowerPal"
    );
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  } catch (err) {
    console.log(`FAILED TO START: ${err}`);
  }
};

run();

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});