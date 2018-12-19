import { NextFunction, Request, Response, Router } from "express";
import { mongoose } from "../../config/database";

import { ITodo, Todo } from "../models/todo";

export class TodoRoute {

    public static routes(): Router {
        console.log("[Todo::routes] creating route.");

        const router: Router = Router();
        router.get("/", (req: Request, res: Response) => {
            new TodoRoute().findAll(req, res);
        });

        router.post("/", (req: Request, res: Response) => {
            new TodoRoute().save(req, res);
        });

        router.put("/:id", (req: Request, res: Response) => {
            new TodoRoute().update(req, res);
        });

        router.delete("/:id", (req: Request, res: Response) => {
            new TodoRoute().remove(req, res);
        });

        return router;
    }

    public async findAll(req: Request, res: Response): Promise<any> {
        console.log("findAll");
        console.log(req.body);

        const todos = await Todo.find({}).exec();
        res.json(todos);
    }

    public async save(req: Request, res: Response): Promise<void> {
        console.log("save");
        console.log(req.body);

        const data: any = req.body.todo;
        const todo = new Todo({
            title: data._title,
            completed: data._completed
        });
        const result = await todo.save();
        console.log("todo save(create)");
        console.log(result);
    }

    public async update(req: Request, res: Response): Promise<void> {
        console.log("update");
        console.log("req:id" + req.params.id);
        console.log(req.body);

        const data: any = req.body.todo;
        Todo.findOne({ _id: req.params.id }, (error: any, todo: ITodo) => {
            console.log("todo findOne");
            console.log(todo);
            todo.set({ title: data._title, completed: data._completed });
            todo.save((error: any, document: ITodo) => {
                console.log("todo save(update)");
                console.log(document);
            });
        });
    }

    public async remove(req: Request, res: Response): Promise<void> {
        console.log("remove");
        console.log("req:id" + req.params.id);

        Todo.findOne({ _id: req.params.id }, (error: any, todo: ITodo) => {
            console.log("todo findOne");
            console.log(todo);
            todo.remove((error: any, document: ITodo) => {
                console.log("todo remove");
                console.log(document);
            });
        });
    }

}
