
import {Router} from "express"
import { CreateAccountController } from "./modules/account/useCases/createUser/CreateAccountController";
import { AuthenticateAccountController } from "./modules/account/useCases/authenticateUser/AuthenticateAccountController";

export const routes =  Router();

const createAccountController = new CreateAccountController();

const authenticateAccountController = new AuthenticateAccountController();


routes.post("/createAccount", createAccountController.handle)
routes.post("/authenticateAccount", authenticateAccountController.handle)