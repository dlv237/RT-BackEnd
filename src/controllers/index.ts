import { Request, Response } from 'express';

class IndexController {
    async getItems(req: Request, res: Response) {
        // Logic to retrieve items from the database
        res.send("Get items");
    }

    async createItem(req: Request, res: Response) {
        // Logic to create a new item in the database
        res.send("Create item");
    }
}

export default IndexController;