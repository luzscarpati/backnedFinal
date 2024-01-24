import ProductMongoDao from "./daos/mongodb/products/product.dao.js";
import UserMongoDao from "./daos/mongodb/users/user.dao.js";
import ProductFSDao from "./daos/filesystem/products/product.dao.js";
import UserFSDao from "./daos/filesystem/users/user.dao.js";
import CartsMongoDao from "./daos/mongodb/carts/cart.dao.js";
import CartFsDao from "./daos/filesystem/carts/cart.dao.js";
import 'dotenv/config';
import { initMongoDB } from "../config/connection.js";

let userDao;
let productDao;
let cartDao;
const persistence = process.argv[2] // toma de línea de comando
switch (persistence) {
    case "FS":
        userDao = new UserFSDao('./src/persistence/daos/filesystem/users.json');
        productDao = new ProductFSDao('./src/persistence/daos/filesystem/products.json');
        cartDao = new CartFsDao('./src/persistence/daos/filesystem/carts.json')
        console.log(persistence);
        break;
    case "MONGO":
        await initMongoDB();
        userDao = new UserMongoDao();
        productDao = new ProductMongoDao();
        cartDao = new CartsMongoDao();
        console.log(persistence);
        break;
    default:
        userDao = new UserFSDao('./src/persistence/daos/filesystem/users.json');
        productDao = new ProductFSDao('./src/persistence/daos/filesystem/products.json');
        cartDao = new CartFsDao('./src/persistence/daos/filesystem/carts.json')
        break;
}

export default { userDao, productDao, cartDao };