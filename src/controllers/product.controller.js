import Controllers from "./class.controller.js";
import ProductService from "../services/product.services.js";
import { createResponse } from "../utils/utils.js";

const productService = new ProductService(); 
export default class ProductController extends Controllers {
    constructor() {
        super(productService);
    };

    createMocksProducts = async (req, res, next) =>{
        try{
            const { cant } = req.query;
            const response = await productService.createMocksProducts(cant);
            return (
                createResponse(res, 200, response)
            )

        }catch(error){
            next(error.menssage);
        }
    }
};