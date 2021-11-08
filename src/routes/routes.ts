import { request, response, Router } from "express";
import  ContactControllers  from "../controllers/contactController";
import PhoneControllers from "../controllers/phoneController";
import UserControllers from "../controllers/userController";
import auth from "../middleware/auth"


const router = Router();
const contactsControllers = new ContactControllers();
const phoneController = new PhoneControllers();
const userControllers = new UserControllers();

router.post('/login', userControllers.login);
router.get('/refreshtoken', userControllers.refreshToken);


router.get('/contacts', auth.verifyAuth, contactsControllers.list);
router.post('/contacts', auth.verifyAuth, contactsControllers.create);
router.get('/contacts/:contactId', auth.verifyAuth, contactsControllers.findOne);
router.put('/contacts/:contactId', auth.verifyAuth, contactsControllers.update);
router.delete('/contacts/:contactId', auth.verifyAuth, contactsControllers.delete)

router.get('/phones', phoneController.list);
router.post('/contacts/:contactId/phones', phoneController.create);
router.get('/contacts/:contactId/phones', phoneController.list);
router.get('/contacts/:contactId/phones/:phoneId', phoneController.findOne);
router.put('/contacts/:contactId/phones/:phoneId', phoneController.update);
router.delete('/contacts/:contactId/phones/:phoneId', phoneController.delete)

router.get('/users', auth.verifyAuth, userControllers.list);
router.post('/users', auth.verifyAuth, userControllers.create);
router.patch('/users/changepassword/:userId', auth.verifyAuth, userControllers.changePassword);
router.get('/users/:userId', auth.verifyAuth, userControllers.findOne);
router.patch('/users/:userId', auth.verifyAuth, userControllers.update);
router.delete('/users/:userId', auth.verifyAuth, userControllers.delete);

export { router };