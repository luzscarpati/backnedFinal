import MongoDao from "../mongo.dao.js";
import { CartModel } from "./cart.model.js";

export default class CartsMongoDao extends MongoDao {
    constructor(){
        super(CartModel);
    };
    
    async addProdToCart(existCart, prodId){
        try{
            console.log("existCart: ", existCart);
            const newProd = {
                "quantity" : 1,
                "product" : prodId
            };
            existCart.products.push(newProd);
            const response = await this.model.updateOne({_id: existCart._id}, existCart);

            return response;
        }catch(error){
            console.log(error);
        };
    };
};
