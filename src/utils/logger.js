import winston from "winston";
import "winston-mongodb";

const logConfiguration = {
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: 'mongodb+srv://luzscarpati:oufU0an1vInHeUyO@codercluster.pflfwh6.mongodb.net/coderhouse47345?retryWrites=true&w=majority',
        collection: "logs",
        tryReconnect: true, 
        level: "error",
      })
    ),
    new winston.transports.Console({ level: "silly" }), 

    new winston.transports.File({
      filename: "./logs.log",
      level: "info", 
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);