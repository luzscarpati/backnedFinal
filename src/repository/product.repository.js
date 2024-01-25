import persistence from "../persistence/persistence.js";
const { prodDao } = persistence;
import ProductResDTO from "../dto/product.res.dto.js";
import ProductReqDTO from "../dto/product.req.dto.js";

export default class ProductRepository {
    constructor(){
        this.dao = prodDao
    }

    async getProdById(id){
        try {
            const prod = await this.dao.getById(id);
            return new ProductResDTO(prod)
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createProd(obj) {
        try {
          const prodDTO = new ProductReqDTO(obj);
          const response = await this.dao.create(prodDTO);
          return response;
        } catch (error) {
          console.log(error);
        }
      }
}