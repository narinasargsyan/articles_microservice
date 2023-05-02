import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { articlesRouter } from "./api/routes/articles";
import AuthorizationMiddleware from "../src/api/middleweares/authorization.middleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use(AuthorizationMiddleware.checkKey);

app.use("/articles/api", articlesRouter);

app.listen(process.env.APP_PORT);
