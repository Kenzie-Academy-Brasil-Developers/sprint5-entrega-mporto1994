import {Router} from "express";
import { authUser } from "../middlewares/authUser.middleware";

const routes = Router();

import userCreateController  from "../controllers/users/userCreate.controller";
import userListController    from "../controllers/users/userList.controller";
import userListOneController from "../controllers/users/userListOne.controller"
import userLoginController   from "../controllers/users/userLogin.controller"
import userDeleteController  from "../controllers/users/userDelete.controller";
import userUpdateController  from "../controllers/users/userUpdate.controller"

routes.post("/users",userCreateController);
routes.post("/users/login", userLoginController);
routes.get("/users", userListController);
routes.get("/users/me",authUser, userListOneController);

routes.patch("/users/me/update", authUser, userUpdateController)
routes.delete("/users/me",authUser, userDeleteController);

export default routes