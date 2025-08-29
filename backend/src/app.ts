import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import path from 'path';
import { errorHandler } from './middleware/errorHandler.js';
import connectDB from './config/connectDB.js';

import authRouter from './routers/authRoutes.js';
import homeRouter from './routers/homeRoutes.js';

//importante variable assigning
const app = express();
const PORT = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/student';

//setting path variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware for 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Express session
app.use(session({
    secret: "JeesV!@#$%^&*",
    resave: false,
    saveUninitialized: true,
}));

//set uping static file path
app.use(express.static(path.join(__dirname, '../../frontend/public')));

//setting view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../frontend/view'));


app.use("/", authRouter);
app.use("/", homeRouter);

app.use((req, res) => {
    res.render('notfound');
});

//error handling middleware
app.use(errorHandler);


connectDB(mongoUrl).then(() => app.listen(PORT, () => console.log("server connect at port 3000")));