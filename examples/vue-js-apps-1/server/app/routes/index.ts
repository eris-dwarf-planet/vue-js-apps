import { NextFunction, Request, Response, Router } from "express";

export class IndexRoute {

  public static routes(): Router {
    console.log("[Index::routes] creating route.");

    const router: Router = Router();
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });
    return router;
  }

  public index(req: Request, res: Response, next: NextFunction): void {
    res.sendFile(__dirname + "/../public/index.html");
  }
}
