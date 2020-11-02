import { User } from "../entities/user.entities";
import { Mycontext } from "../types";
import { Resolver, Query, Ctx, Mutation, Arg, } from "type-graphql";
import { login } from '../types/login.type';
import { EmailPasswordInput } from '../types/emailpaswordinput';
import { UserResponse } from '../types/userresponse.type';
import argon2 from 'argon2';
@Resolver()
export class UserResolver{
  @Query(() => [User])
  users(@Ctx() {em}: Mycontext): Promise<User[] | null> {
    return em.find(User, {})
  }

  @Mutation(() => User)
  async register(
    @Arg('options') options: EmailPasswordInput,
    @Ctx() {em, req}:Mycontext
  ) {
    const hashedpassword = await argon2.hash(options.password)
    const user = em.create(User, {
      email: options.email, 
      password: hashedpassword, 
      name: options.name,
      lastName: options.lastName,
      resumeProfile: options.resumeProfile,
      photoProfile: options.photoProfile
    })
    await em.persistAndFlush(user)
    
    req.session.userId = user.id;
    console.log(req.session.userId);
    
    return { user }
  }
  
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: login,
    @Ctx() {em, req}:Mycontext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email } 
    );
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
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
  
    req.session.userId = user.id;
    console.log(req.session.userId)

    return {
      user,
    };
  }

}