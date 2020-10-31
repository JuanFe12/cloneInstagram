import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType, Int } from 'type-graphql';
//import { User } from "./user.entities";

@ObjectType()
@Entity()
export class Post {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type: 'date'})
    createAt = new Date();

    @Field(() => String)
    @Property({type: 'date', onUpdate: () => new Date() })
    updateAt = new Date;

    @Field(() => String)
    @Property({type: 'text'})
    title!: string;

    /*@ManyToOne(() => User, (user) => user.posts)
    author: User;*/
    @Field(() => String)
    @Property({type: 'text'})
    author!: string;

    @Field(() => String)
    @Property({type: 'text'})
    file!: string;

}