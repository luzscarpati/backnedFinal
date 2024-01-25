import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
import { createResponse } from "../utils.js";

const service = new CartService();
export default class CartController extends Controllers {
  constructor() {
    super(service);
  };

  remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cartDel = await service.remove(id);
      if (!cartDel) {
        createResponse(res, 404, "Error delete cart!" )
      } else {
        createResponse(res, 200, `Cart id: ${id} deleted`);
      }
    } catch (error) {
      next(error.message);
    }
  };

  addProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await service.addProdToCart(
        idCart,
        idProd,
      );
      if (!newProdToUserCart){
        createResponse(res, 404, "Error add product to cart");
      } else {
        createResponse(res, 200, newProdToUserCart);
      }
    } catch (error) {
      next(error.message);
    }
  };

  removeProdToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await service.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) {
        createResponse(res, 404, "Error remove product to cart"); 
      } else {
        createResponse(res, 200, `product ${idProd} deleted to cart`);
      };
    } catch (error) {
      next(error.message);
    }
  };

  updateProdQuantityToCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const updateProdQuantity = await service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) {
        createResponse(res, 404, "Error update product quantity to cart");
      } else {
        createResponse(res, 200, updateProdQuantity);
      };
    } catch (error) {
      next(error.message);
    }
  };

  clearCart = async (req, res, next) => {
    try {
      const { idCart } = req.params;
      const clearCart = await service.clearCart(
        idCart,
      );
      if (!clearCart) {
        createResponse(res, 404, "Error clear cart");
      } else {
        createResponse(res, 200, clearCart);
      };
    } catch (error) {
      next(error.message);
    }
  };
};