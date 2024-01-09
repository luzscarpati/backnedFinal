import express from "express";
import morgan from "morgan";
import MainRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./config/connection.js";
import { __dirname, mongoStoreOptions } from "./utils.js";
import handlebars from "express-handlebars";
import session from "express-session";
import passport from "passport";
import 'dotenv/config';
import viewsRouter from "./routes/views.router.js";


const mainRouter = new MainRouter();
const app = express();

app.use(session(mongoStoreOptions));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/api', mainRouter.getRouter());
app.use('/views', viewsRouter);
app.use(errorHandler);

const persistence = process.env.PERSISTENCE;

if(persistence === 'MONGO') {
    try{
        await initMongoDB();
        console.log('MondoDB connection successful');
    }catch(error){
        console.log(error, 'Error connecting to MongoDB')
    };
};

const PORT = process.env.PORT 

app.listen(PORT, ()=> console.log(`SERVER UP ON PORT: ${PORT}`));
//  VIDEO SEGUNDA PRÁCTICA INTEGRADORA MINUTO 35