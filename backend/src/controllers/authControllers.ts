import type { Request, Response, NextFunction } from "express";
import User from '../models/userSchema.js'
import bcrypt from 'bcrypt';


export type controllerFunction = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;

//for define controller function type
export interface controllerMap {
    renderLogin: controllerFunction;
    renderSignup: controllerFunction;
    createUser: controllerFunction;
    verifyLogin: controllerFunction;
}

//for difine type of signup body destructuring
interface SignUpBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

//for define type of login body destructuring
interface LoginBody {
    email: string;
    password: string;
}

const authController: controllerMap = {

    //@desc for render login page.
    //Router GET /
    renderLogin: (req, res, next) => {
        try {
            if (req.session.email) {
                return res.redirect("/home");
            }
            res.render('logIn');
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    },

    //@desc for render signup page
    //Router GET /signup
    renderSignup: (req, res) => {
        try {
            res.render("signUp");
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });

        }
    },

    //@desc for, create new user
    //Router POST /signup
    createUser: async (req, res, next) => {
        try {

            //getting data from request body.
            const { name, email, password, confirmPassword } = req.body as SignUpBody;

            //checking any user existing with new email
            const user = await User.findOne({ email });

            //checking email
            if (user) res.status(401).json({ success: false, email: true, message: "This email is existing" });

            //checkig password
            if (password !== confirmPassword) res.status(401).json({ success: false, password: true, message: "Password not matching" });

            //Generating hash password
            const salt: string = await bcrypt.genSalt(10);
            const hashPassword: string = await bcrypt.hash(password, salt);

            //creating new user
            const newUser = new User({
                name,
                email,
                hashPassword
            });

            //inserting new user to DB
            await newUser.save();

            res.json({ success: true, message: "User created" });


        } catch (error) {
            next(error);
        }
    },

    //@desc verify user login
    //Router POST /l
    verifyLogin: async (req, res, next) => {
        try {

            //getting data
            const { email, password } = req.body as LoginBody;

            //getting user document from db.
            const user = await User.findOne({ email });

            //checking the user exist or not
            if (!user) res.status(401).json({ success: false, email: true, message: "email not find" });

            //password checking
            if (user) {
                const pass: boolean = await bcrypt.compare(password, user.hashPassword);
                if (!pass) res.status(401).json({ success: false, password: true, message: "wrong password" })
            };

            //creating new session for logged user
            req.session.email = email;
            res.json({ success: true })

        } catch (error) {
            next(error);
        }
    }
}

export default authController;