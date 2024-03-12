export default class MongoDao {
    constructor(model) {
        this.model = model;
    };

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        }catch (error) {
            throw new Error(error.message);
        };
    };

    async getById(id) {
        try{
            const response = await this.model.findById(id);
            return response;
        }catch(error){
            throw new Error(error.message)
        };
    };

    async create(obj) {
        try{
            const response = await this.model.create(obj);
            return response;
        }catch(error){
            throw new Error(error.message)
        };
    };

    // async getByEmail(obj) {
    //     try{
    //         console.log("getByEmail input:", obj);
    //         const response = await this.model.findOne({ email: obj.email });
    //         return response;
    //     }catch(error){
    //         console.log(error);
    //     };
    // };

    async update(id, obj) {
        try{
            const itemUpd = await this.model.findByIdAndUpdate(id, obj, { new: true });
            return itemUpd
        }catch(error){
            throw new Error(error.message)
        };
    };

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch(error) {
            throw new Error(error.message);
        }
    };
};