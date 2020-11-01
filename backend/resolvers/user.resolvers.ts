import { User } from "../entities/user.entities";
import { Mycontext } from "backend/types";
import { Resolver, Query, Ctx, Mutation, InputType, Field, Arg, ObjectType } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class login{
  @Field()
  email: string;

  @Field()
  password: string;
}
@InputType()
class EmailPasswordInput {
 
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  resumeProfile: string;

  @Field()
  photoProfile: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError{
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?: User
}
@Resolver()
export class UserResolver{
  @Query(() => [User])
  users(@Ctx() {em}: Mycontext): Promise<User[]> {
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
    
    return user
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
  
    req.session.userId = user.email;

    return {
      user,
    };
  }

}