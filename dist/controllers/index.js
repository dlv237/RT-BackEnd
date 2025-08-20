"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    async getItems(req, res) {
        // Logic to retrieve items from the database
        res.send("Get items");
    }
    async createItem(req, res) {
        // Logic to create a new item in the database
        res.send("Create item");
    }
}
exports.default = IndexController;
