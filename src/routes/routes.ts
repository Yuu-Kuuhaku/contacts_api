import { Router } from "express";
import  ContactControllers  from "../controllers/contactController";
import PhoneControllers from "../controllers/phoneController";
import UserControllers from "../controllers/userController";

const router = Router();
const contactsControllers = new ContactControllers();
const phoneController = new PhoneControllers();
const userControllers = new UserControllers();

router.post('/login', userControllers.login);


router.get('/contacts', contactsControllers.list);
router.post('/contacts', contactsControllers.create);
router.get('/contacts/:contactId', contactsControllers.findOne);
router.put('/contacts/:contactId', contactsControllers.update);
router.delete('/contacts/:contactId', contactsControllers.delete)

router.get('/phones', phoneController.list);
router.post('/contacts/:contactId/phones', phoneController.create);
router.get('/contacts/:contactId/phones', phoneController.list);
router.get('/contacts/:contactId/phones/:phoneId', phoneController.findOne);
router.put('/contacts/:contactId/phones/:phoneId', phoneController.update);
router.delete('/contacts/:contactId/phones/:phoneId', phoneController.delete)

router.get('/users', userControllers.list);
router.post('/users', userControllers.create);
router.patch('/users/changepassword/:userId', userControllers.changePassword);
router.get('/users/:userId', userControllers.findOne);
router.patch('/users/:userId', userControllers.update);
router.delete('/users/:userId', userControllers.delete);



export { router };