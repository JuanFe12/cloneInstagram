import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
//import { Post } from "./post.entities";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property({type: 'date'})
    createAt = new Date();

    @Property({type: 'date', onUpdate: () => new Date() })
    updateAt = new Date;

    @Property({type: 'text'})
    name!: string;

    @Property({type: 'text'})
    lastName!: string;

    @Property({type: 'text'})
    email!: string;

    @Property({type: 'text'})
    password!: string;

    @Property({type: 'text'})
    photoProfile!: string;

    @Property({type: 'text'})
    resumeProfile!: string;

    /*@OneToMany(() => Post, (post) => post.author)
    posts: Post[];*/
 }