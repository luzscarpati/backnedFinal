import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./config/connection.js";
import 'dotenv/config';

const mainRouter = new MainRouter();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', mainRouter.getRouter());

app.use(errorHandler);

const persistence = process.env.PERSISTENCE;

if(persistence === 'MONGO') await initMongoDB();
const PORT = process.env.PORT 

app.listen(PORT, ()=> console.log(`SERVER UP ON PORT: ${PORT}`));
