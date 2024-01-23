import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils.js";

const userService = new UserService();

export default class UserController extends Controllers {
    constructor() {
        super(userService);
    };

    register = async (req, res, next) => {
        try {
            const newUser = await userService.register(req.body);
            if(!newUser){
              //res.redirect(`/views/errorRegister`)
              createResponse(res, 404, "Sorry, user email already exist");
            }else {
              //res.redirect(`/views`);
              createResponse (res, 200, newUser);
            }
            
        }catch(error){
            next(error.message);
        };
    };

    login = async (req, res, next) => {
      try {
        const token = await userService.login(req.body);
        if (!token) {
          createResponse(res, 404, "Error login");
          //res.redirect('/errorLogin');
        } else {
          //res.render('profile', { token });
          createResponse (res, 200, token)
        }
      } catch (error) {
        next(error.message);
      }
    };
    
    
    
    profile = async (req, res, next) => {
        try {
          const { first_name, last_name, email, role } = req.user;
          //res.render('profile', {first_name})
          console.log({first_name})
          createResponse(res, 200, {
            first_name,
            last_name,
            email,
            role,
          });
        }catch (error) {
          next(error.message);
        };
      };
};