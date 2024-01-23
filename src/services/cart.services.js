import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";

const {cartDao} = persistence;

export default class CartService extends Services {
    constructor(){
        super(cartDao);
    };

    async remove (id) {
        try {
          const cartDel = await cartDao.delete(id);
          if (!cartDel) return false;
          else return cartDel;
        } catch (error) {
          console.log(error);
        }
      };
      
    
    async addProdToCart (cartId, prodId) {
      try {
        const existCart = await getById(cartId);
        console.log("existCart-->", existCart);
        if (!existCart) return false;
    
        const existProd = await prodDao.getById(prodId);
        console.log("existProd-->", existProd);
        if (!existProd) return false;
          //SI EXISTE, aumenta quantity++
        const existProdInCart = existCart.products.find((p)=>p.product._id.toString() === prodId.toString());
        if(existProdInCart) {
          existProdInCart.quantity++;
          existCart.save();
          return existProdInCart;
        } else {
          return await cartDao.addProdToCart(existCart, prodId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    async removeProdToCart (cartId, prodId) {
        try {
          const existCart = await getById(cartId);
          console.log("existCart-->", existCart);
          if (!existCart) return false;
      
          const existProd = existCart.products.find((p)=>p.product._id.toString() === prodId.toString());
          console.log("existProd-->", existProd);
          if (!existProd) return false;
      
          return await cartDao.removeProdToCart(existCart, existProd);
        } catch (error) {
          console.log(error);
        }
      };
    
      async updateProdQuantityToCart (cartId, prodId, quantity) {
        try {
          const existCart = await getById(cartId);
          console.log("existCart-->", existCart);
          if (!existCart) return false;
      
          const existProd = existCart.products.find((p)=>p.product._id.toString() === prodId.toString());
          console.log("existProd-->", existProd);
          if (!existProd) return false;
      
          return await cartDao.updateProdQuantityToCart(existCart, existProd, quantity);
        } catch (error) {
          console.log(error);
        }
      };
    
      async clearCart (cartId) {
        try {
          const existCart = await getById(cartId);
          console.log("existCart-->", existCart);
          if (!existCart) return false;
    
          return await cartDao.clearCart(existCart);
        } catch (error) {
          console.log(error);
        }
      };

};