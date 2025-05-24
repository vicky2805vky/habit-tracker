import app from "./app";
import { connectDb } from "./configs/db.config";
import config from "./configs/dotenv.config";

connectDb()
  .then(() => {
    app.listen(config.port, (err) => {
      if (!err) {
        console.log(`the server started successfully at port ${config.port}`);
      } else {
        console.log(`Failed to start the server: ${err.message}`);
      }
    });
  })
  .catch((err) => {
    console.log("Error: " + err.message);
  });
