import { Router, Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import CrudRepository from "./crud-repository";

class CrudController<T extends Document> {
  private repo: CrudRepository<T>;
  private router: Router;

  constructor(model: Model<T>) {
    this.repo = new CrudRepository<T>(model);
    this.router = Router();

    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getById);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }

  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.repo.getAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  };

  private getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.repo.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  };

  private create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newItem = await this.repo.create(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedItem = await this.repo.update(req.params.id, req.body);
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(updatedItem);
    } catch (error) {
      next(error);
    }
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedItem = await this.repo.delete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(deletedItem);
    } catch (error) {
      next(error);
    }
  };

  getRouter(): Router {
    return this.router;
  }
}

export default CrudController;
