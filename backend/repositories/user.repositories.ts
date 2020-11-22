import { Mycontext } from './../types';
import { login } from './../types/login.type';
import { User } from "./../entities/user.entities";

export const loginRepository = async ({em}: Mycontext) =>{
  const user = await em.findOne(User,
      { email: typeof login }
     );

     
  return user
}