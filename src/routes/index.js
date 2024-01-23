import { Router } from "express";
import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import cartRouter from "./cart.router.js"

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.initRoutes();
    };

    initRoutes() {
        this.router.use('/products', productRouter);
        this.router.use('/users', userRouter);
        this.router.use('/carts', cartRouter);
        this.router.use('/ticket', ticketRouter);
    };

    getRouter() {
        return this.router;
    };
};