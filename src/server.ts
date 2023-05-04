import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { userArticlesRouter } from "./api/routes/users.articles";
import { adminArticlesRouter } from "./api/routes/admins.articles";
import AuthorizationMiddleware from "../src/api/middleweares/authorization.middleware";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use(AuthorizationMiddleware.checkKey);

app.use("/articles/api", userArticlesRouter);
app.use("/articles/api", adminArticlesRouter);

app.listen(process.env.APP_PORT);
