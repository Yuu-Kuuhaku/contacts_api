import { Router } from "express";
import  ContactsControllers  from "../controllers/contacts";

const router = Router();
const contactsControllers = new ContactsControllers();

router.get('/contacts', contactsControllers.list);
router.post('/contacts', contactsControllers.create);

export { router };