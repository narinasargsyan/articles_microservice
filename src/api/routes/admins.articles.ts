import * as express from "express";
import db from "../../db/models"
const adminArticlesRouter = express.Router();
import validate from "../middleweares/validation/validate";
import AdminArticleController from "../controller/admins.articles.controller";
import AuthorizationMiddleware from "../middleweares/authorization.middleware";
import ArticleRepository from "../repositories/article.repository";

const articleRepository = new ArticleRepository(db.Articles);
const authorizationMiddleware = new AuthorizationMiddleware();
const article = new AdminArticleController(articleRepository);

adminArticlesRouter.use(authorizationMiddleware.authenticate);
adminArticlesRouter.use(authorizationMiddleware.isAdmin);

adminArticlesRouter.get("/list", validate("adminGetListSchema"),article.adminGetList);
adminArticlesRouter.put("/update", article.adminUpdateArticle);
adminArticlesRouter.delete("/delete", article.adminDeleteArticle);

export { adminArticlesRouter };
