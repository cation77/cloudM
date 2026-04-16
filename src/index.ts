import express from "express";
import logger from "./middlewares/logger";
import { errorHandler } from "./middlewares/error";
import routers from "./routes/index";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", routers);
app.use(errorHandler);

const PORT = 3030;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
