import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartsMongoDao extends MongoDao {
    constructor(){
        super(CartModel);
    };
};