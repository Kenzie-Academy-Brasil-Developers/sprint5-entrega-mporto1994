import {Request, Response} from "express"
import userUpdateService from "../../services/users/userUpdate.service"

const userUpdateController = async (req:Request, res:Response) => {
    try{
        const {id} = req.params        
        const {email,password,name, age} = req.body

        if(!password){
            throw new Error ("No password informed.")
        }

        const user = await userUpdateService({id, name,email, password, age})

        return res.status(201).json({message: "Password updated!"})

    }catch(err){
        if(err instanceof Error){
            return res.status(401).send({
                error: err.name,
                message: err.message
            }); 
         }
    }
}
export default userUpdateController