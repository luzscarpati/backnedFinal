// import persistence from "../persistence/persistence.js";
// const { userDao } = persistence;
// import UserResDTO from "../dto/user.res.dto.js";
// import UserReqDTO from "../dto/user.req.dto.js";

// export default class UserRepository {
//     constructor(){
//         this.dao = userDao;
//     }

//     async getByEmail(email){
//         try {
//             const user = await this.dao.getByEmail(email);
//             return new UserResDTO(user)
//         } catch (error) {
//             throw new Error(error.message);
//         };
//     };

//     async create(obj) {
//       try {
//         const userDTO = new UserReqDTO(obj);
//         const response = await this.dao.create(userDTO);
//         return response;
//       } catch (error) {
//         console.log(error);
//       };
//     };
// };