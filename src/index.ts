import express from "express";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/error";
import routers from "./routes/index";
import { config } from "./config/index";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", routers);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${config.PORT}`);
});
