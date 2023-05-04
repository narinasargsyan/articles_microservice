import * as express from "express";
import db from "../../db/models"
const userArticlesRouter = express.Router();
import UserArticleController from "../controller/users.articles.controller";
import ArticleRepository from "../repositories/article.repository";
import AuthorizationMiddleware from "../middleweares/authorization.middleware";

const articleRepository = new ArticleRepository(db.Articles);
const authorizationMiddleware = new AuthorizationMiddleware();
const article = new UserArticleController(articleRepository);

userArticlesRouter.use(authorizationMiddleware.authenticate);

userArticlesRouter.post("/user/create", article.userCreateArticle);
userArticlesRouter.put("/user/update", article.userUpdateArticle);

export { userArticlesRouter };
