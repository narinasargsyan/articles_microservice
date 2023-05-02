import * as express from "express";
const articlesRouter = express.Router();
import ArticleController from "../controller/articles.controller";
import validate from "../middleweares/validation/validate";
import auth from "../middleweares/authentication.middlewear";
import articleRepository from "../repositories/article.repository";

const article = new ArticleController(articleRepository);


articlesRouter.post("user/article/create", article.userCreateArticle);
articlesRouter.put("user/article/update", article.userUpdateArticle);
articlesRouter.put("admin/article/update", article.userCreateArticle);
articlesRouter.delete("admin/article/delete", article.userUpdateArticle);


export { articlesRouter };
