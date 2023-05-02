import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import { articlesRouter } from "./api/routes/admins";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/articles", articlesRouter);

app.listen(process.env.APP_PORT);
