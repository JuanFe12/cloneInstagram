import { User } from "../entities/user.entities";
import { Mycontext } from "backend/types";
import { Resolver, Query, Ctx } from "type-graphql";

@Resolver()
export class UserResolver{
  @Query(() => [User])
  users(@Ctx() {em}: Mycontext): Promise<User[]> {
    return em.find(User, {})
  }
}