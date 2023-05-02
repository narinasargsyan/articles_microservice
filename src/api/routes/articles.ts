import * as express from "express";
import db from "../../db/models"
const articlesRouter = express.Router();
import ArticleController from "../controller/articles.controller";
import ArticleRepository from "../repositories/article.repository";

const articleRepository = new ArticleRepository(db.Articles);

const article = new ArticleController(articleRepository);

articlesRouter.post("/user/create", article.userCreateArticle);
articlesRouter.put("/user/update", article.userUpdateArticle);
articlesRouter.put("/admin/update", article.adminUpdateArticle);
articlesRouter.delete("/admin/delete", article.adminDeleteArticle);

export { articlesRouter };
