import Services from "./class.services.js";
//import UserMongoDao from "../persistence/daos/mongodb/users/user.dao.js";
import persistence from "../persistence/persistence.js";
const {userDao} = persistence
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_KEY_JWT  = process.env.SECRET_KEY_JWT;

export default class UserService extends Services {
    constructor(){
        super(userDao);
    };

    #generateToken(user) {
      try {
            const payload = {
            userId: user._id,
          };
          const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "10m" });
          return token;
      } catch (error) {
          console.log('Error al generar el token:', error);
          return null;
      }
  };
         

    async register(user) {
        try{
            return await userDao.register(user);
        }catch(error) {
            console.log(error);
        };
    };

    async login(user) {
      try {
          const userExist = await userDao.login(user);

          if (userExist) {
              const token = this.#generateToken(userExist);  
              if (!token) {
                  console.log("Error al generar el token");
                  return null;
              };
              return token;
          } else {
              return null;
          };
      } catch (error) {
          console.log('user.service', error);
          throw error;
      };
  };
};