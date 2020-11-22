import { InputType, Field } from "type-graphql";

@InputType()
export class EmailPasswordInput {
 
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}