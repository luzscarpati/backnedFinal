import Services from "./class.services.js";
import persistence from "../persistence/persistence.js";

const {cartDao} = persistence;

export default class CartService extends Services {
    constructor(){
        super(cartDao);
    };
};