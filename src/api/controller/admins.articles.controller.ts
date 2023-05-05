import { Response, Request } from "express";
import ArticleRepository from "../repositories/article.repository";
import {buildWhereObject} from "../helpers/filter";

class AdminArticleController {
    public articleRepository: ArticleRepository;
    constructor(articleRepository) {
        this.articleRepository = articleRepository;
    }
    adminUpdateArticle = async (req: Request, res: Response) => {
        try {
            const { text, editorId, articleId } = req.body;
            await this.articleRepository.update({ id:articleId }, { text, editorId });
            return res.status(200).send("You successfully update as admin");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    adminGetList = async (req: Request, res: Response) => {
        try {
            const where = buildWhereObject(req.body);
            const articles = await this.articleRepository.findAll({ ...where });
            return res.send(articles);
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    adminDeleteArticle = async (req: Request, res: Response) => {
        try {
            const { editorId, articleId } = req.body;
            await this.articleRepository.update({ id: articleId },{ editorId, deleted: true});
            return res.send("You have successfully delete article as admin!");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };
}

export default AdminArticleController;
