import type { Request, Response, NextFunction } from "express";
import Student from "../models/studentSchema.js";

export type controllerFunction = (req: Request, res: Response, next: NextFunction) => any | Promise<any>

export interface controllerMap {
    renderHome: controllerFunction;
    renderAddNewStudent: controllerFunction;
    addNewStudent: controllerFunction;
    getSudents: controllerFunction;
    editStudent: controllerFunction;
    updateStudent: controllerFunction;
    deleteStudent: controllerFunction;
    logout: controllerFunction;
}

interface addNewStudentBody {
    name: string;
    stundentclass: string;
    phone: string;
}

interface updateStudentBody {
    name: string;
    stundentclass: string;
    phone: string;
    id: string;
}

const homeController: controllerMap = {
    renderHome: (req, res, next) => {
        try {
            res.render('home');
        } catch (error) {
            next(error)
        }
    },

    //@desc render add new studnet details form
    //Router GET /add-new-student
    renderAddNewStudent: (req, res, next) => {
        try {
            res.render("addstudent");
        } catch (error) {
            next(error)
        }
    },

    //@desc add new student details
    //Router POST /add-new-student
    addNewStudent: async (req, res, next) => {
        try {

            const { name, stundentclass, phone } = req.body as addNewStudentBody;

            //Checking there is any phone number matching
            const studnet = await Student.findOne({ phone });
            if (studnet) return res.status(401).json({ success: false, phone: true, message: "User another phone numger" });

            const newStudent = new Student({
                name,
                stundentclass,
                phone
            });

            await newStudent.save();
            res.json({ success: true });

        } catch (error) {
            next(error);
        }
    },

    //@desc get studets datails
    //Router GET /students
    getSudents: async (req, res, next) => {
        try {
            //fetching students data
            const students = await Student.find();
            res.json({ success: true, students });
        } catch (error) {
            next(error);
        }
    },

    //@desc render student edit page with details
    //Router GET /edit/:id
    editStudent: async (req, res, next) => {
        try {
            const _id: any = req.params.id;
            const student = await Student.findOne({ _id });
            res.render("editstudent", { student });

        } catch (error) {
            next(error);
        }
    },

    //@desc save edited student details
    //Router POST /edit
    updateStudent: async (req, res, next) => {
        try {

            const { name, stundentclass, phone, id } = req.body as updateStudentBody;

            const phoneExists = await Student.findOne({ phone: phone, _id: { $ne: id } });

            if (phoneExists) res.json({ success: false, phone: true, message: "Phone number already exists for another student" })

            await Student.updateOne({ _id: id }, { name, stundentclass, phone });

            res.json({ success: true, message: "Student details updated" });

        } catch (error) {
            next();
        }
    },

    //@desc delete student details
    // Router DELETE /delete
    deleteStudent: async (req, res, next) => {
        try {
            const _id: any = req.params.id;

            await Student.deleteOne({ _id });

            res.json({ success: true, message: "Stuedent successfull deleted" });

        } catch (error) {
            next(error);
        }
    },

    //@desc logouting session
    //Router GET /logout
    logout: (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect("/home");
            });

        } catch (error) {
            next(error);
        }
    }
}

export default homeController;