import express from "express";
import cors from "cors";
import {
  errorRequestHandler,
  wildCardRouteHandler,
} from "./middlewares/error.middleware";
import { CORS_OPTIONS } from "./constants/constants";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(cookieParser());

app.use(wildCardRouteHandler);
app.use(errorRequestHandler);

export default app;
