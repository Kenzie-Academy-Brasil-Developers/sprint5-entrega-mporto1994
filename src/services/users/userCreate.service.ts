import { User } from "../../entities/user.entity";
import { IUser, IUserCreate } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import bcrypt from "bcrypt"

const userCreateService = async ({name, email, password,age}:IUserCreate) => {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find()

    
    const emailAlredyExists = users.find(user=>user.email===email)
    if (emailAlredyExists){
        throw new Error("Email alredy exists!") 
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = bcrypt.hashSync(password, 10)
    user.age = age
    user.createdAt= new Date()
    user.updatedAt= user.createdAt

    // const user = userRepository.create({name,email})
    userRepository.create(user);

    userRepository.save(user)

    return(user)

}
export default userCreateService;