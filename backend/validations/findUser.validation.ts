import { loginRepository } from './../repositories/user.repositories';


export const findUser = () =>{
    const user = loginRepository
    if (!user) {
        return {
          errors: [
            {
              field: "usernameOrEmail",
              message: "that username doesn't exist",
            },
          ],
        };
      }

}