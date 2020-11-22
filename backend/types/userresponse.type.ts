import { Field, ObjectType } from "type-graphql";
import { FieldError } from './fielderror.types';
import { User } from "../entities/user.entities";


@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?: User
}