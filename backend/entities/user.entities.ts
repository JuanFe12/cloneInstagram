import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType, Int } from 'type-graphql';
//import { Post } from "./post.entities";
@ObjectType()
@Entity()
export class User {
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
    name!: string;

    @Field(() => String)
    @Property({type: 'text'})
    lastName!: string;

    @Field(() => String)
    @Property({type: 'text'})
    email!: string;

    @Field(() => String)
    @Property({type: 'text'})
    password!: string;

    @Field(() => String)
    @Property({type: 'text'})
    photoProfile!: string;

    @Field(() => String)
    @Property({type: 'text'})
    resumeProfile!: string;

    /*@OneToMany(() => Post, (post) => post.author)
    posts: Post[];*/
 }