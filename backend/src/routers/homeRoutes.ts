import homeController from "../controllers/homeController.js";
import  express from "express";
import checkSession from "../middleware/session.js";

const router = express.Router();

//render home page
router.get("/home", checkSession, homeController.renderHome);

//render add new student form
router.get("/add-new-student", checkSession, homeController.renderAddNewStudent);

//creating new student detail
router.post("/add-new-student", checkSession, homeController.addNewStudent);

//get student details
router.get("/students", checkSession, homeController.getSudents);

//update edited student details
router.post("/edit", checkSession, homeController.updateStudent);

//render edit student detail page
router.get("/edit/:id", checkSession, homeController.editStudent);

//delete student details
router.delete("/delete/:id", checkSession, homeController.deleteStudent);

//logout
router.get("/logout", homeController.logout);

export default router;