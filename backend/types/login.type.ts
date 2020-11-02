import { InputType, Field } from "type-graphql";

@InputType()
export class login{
  @Field()
  email: string;

  @Field()
  password: string;
}