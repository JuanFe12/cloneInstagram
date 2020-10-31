import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
//import { User } from "./user.entities";

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({type: 'date'})
    createAt = new Date();

    @Property({type: 'date', onUpdate: () => new Date() })
    updateAt = new Date;

    @Property({type: 'text'})
    title!: string;

    /*@ManyToOne(() => User, (user) => user.posts)
    author: User;*/
    @Property({type: 'text'})
    author!: string;

    @Property({type: 'text'})
    file!: string;

}