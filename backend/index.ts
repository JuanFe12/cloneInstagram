import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
//import { Post } from './entities/post.entities';
import microConfig from './mikro-orm.config';

dotenv.config({
  path: '.env'
});

const main = async () =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up()
    //const post = orm.em.create(Post, {title: 'my first post', file:'image.jpge', author: 'juan'});
    //await orm.em.persistAndFlush(post)
}

main().catch((err) =>{
    console.log(err);
})
