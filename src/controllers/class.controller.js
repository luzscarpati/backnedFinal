import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import { errorsDictionary } from "../utils/http.response.js";

export default class Controllers {
    constructor(service) {
        this.service = service;
    };

    getAll = async(req, res,  next) => {
        try{
            const items = await this.service.getAll();
            return (
                httpResponse.Ok(res, items)
            )
        }catch(error){
            next(error);
        };
    };

    getById = async( req, res, next) => {
        try{
            const { id } = req.params;
            const item = await this.service.getById(id);
            if(!item) {
                return (
                    httpResponse.NotFound(res, "Sorry, Item not found")
                    )
            } else {
                return (
                    httpResponse.Ok(res, item)
                )
            };
        }catch(error){
            next(error);
        };
    };

    create = async(req, res, next) => {
        try{
            const newItem = await this.service.create(req.body);
            if(!newItem) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_ITEM)
                )
            } else {
             return (
                httpResponse.Ok(res, newItem)
             )   
            };
        }catch(error){
            next(error);
        };
    };

    update = async(req, res, next) => {
        try {
            const { id } = req.params;
            const item = await this.service.getById(id);
            if(!item) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_ITEM)
                )
            } else {
                const itemUpd = await this.service.update(id, req.body);
                return (
                    httpResponse.Ok(res, itemUpd)
                )    
            }
        }catch(error){
            next(error.message);
        };
    };

    delete = async(req, res, next) => {
        try{
            const { id } = req.params;
            const item = await this.service.getById(id);
            if(!item) {
                return (
                    httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_ITEM)
                )
            } else {
                const itemUpd = await this.service.delete(id);
                return (
                    httpResponse.Ok(res, itemUpd)
                )                
            };
        }catch(error){
            next(error.message);
        };
    };
};