import { IUserCreate, IUserLogin, IUserUpdate } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userUpdateService = async ({id,name, email, password,age}:IUserUpdate) => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const account = users.find(user => user.id ===id)

    const emailAlredyExists = users.find(user => user.email===email)


    if(bcrypt.compareSync(password,account!.password)) {
        throw new Error ("Password does not match.")
    }

    const newPassword = bcrypt.hashSync(password,10)

    await userRepository.update(account!.id, {name:name,email:email, age:age, password:newPassword, updatedAt:new Date()});

    return true
}

export default userUpdateService;