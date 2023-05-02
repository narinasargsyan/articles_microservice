import * as bcrypt from "bcrypt";
import { models } from "../../db";
import authService from "../services/auth.service";
class ArticleController {
  private articleRepository: any;
  constructor(articleRepository) {
    this.articleRepository = articleRepository;
  }
  userCreateArticle = async (req, res) => {
    try {
      const { text,userId } = req.body;
      await this.articleRepository.create({
        text,
        userId
      });
      res.send("You have successfully added article as user!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  userUpdateArticle = async (req, res) => {
    try {
      const { text,userId } = req.body;
      const article = this.articleRepository.findOne({ userId, text})
      await this.articleRepository.update( { id:article.id }, { text });
      res.send("You have successfully updated article as user!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  adminUpdateArticle = async (req, res) => {
    try {
      const { text, editorId, id } = req.body;
      await this.articleRepository.update({ id }, { text, editorId });
      res.send("You have successfully updated article as admin!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

  adminDeleteArticle = async (req, res) => {
    try {
      const { editorId, id } = req.body;
      await this.articleRepository.update({ id },{ editorId, deleted: true});
      res.send("You have successfully added article as user!");
    } catch (err) {
      res.status(400).send("Something went wrong");
      console.log("error=>", err);
    }
  };

}

export default ArticleController;
