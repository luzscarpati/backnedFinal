import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { createResponse } from "../utils.js";

const service = new TicketService();

export default class TicketController extends Controllers {
    constructor(){
        super(service);
    };

    generateTicket = async (req, res, next) => {
        try {
          const { _id } = req.user;
          const { cartId } = req.params;
          const ticket = await service.generateTicket(_id, cartId);
          if(!ticket) {
            createResponse(res, 404, 'Error generate ticket');
          } else {
            createResponse(res, 200, ticket);
          };
        } catch (error) {
          next(error.message);
        };
      };

};


