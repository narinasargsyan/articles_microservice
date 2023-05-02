import { Response, Request } from "express";
import ArticleRepository from "../repositories/article.repository";
import articleRepository from "../repositories/article.repository";

class ArticleController {
  public articleRepository: ArticleRepository;
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }

  userCreateArticle = async (req: Request, res: Response) => {
    try {
      const { text, userId } = req.body;
      await this.articleRepository.create({
        text,
        userId
      });
      return res.send("You have successfully create article as user!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  userUpdateArticle = async (req: Request, res: Response) => {
    try {
      const { text, userId, articleId } = req.body;
      const article = await this.articleRepository.findOne({ id: articleId, userId });
      await this.articleRepository.update( { id: article.id }, { text });
      return res.send("You have successfully updated article as user!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  adminUpdateArticle = async (req: Request, res: Response) => {
    try {
      const { text, editorId, articleId } = req.body;
      await this.articleRepository.update({ id:articleId }, { text, editorId });
      return res.send("You have successfully updated article as admin!");
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

export default ArticleController;
