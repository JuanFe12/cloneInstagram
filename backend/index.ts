import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
import express from "express";
import { Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello.resolvers";
//import { Post } from './entities/post.entities';
import microConfig from './mikro-orm.config';

dotenv.config({
  path: '.env'
});

const main = async () =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    //const post = orm.em.create(Post, {title: 'my first post', file:'image.jpge', author: 'juan'});
    //await orm.em.persistAndFlush(post)
    const app = express();
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver],
        validate: false
      })
    });

    apolloServer.applyMiddleware({ app });
    app.get('/', (_, res:Response)=> {
      res.send('hello');
    })

    app.listen(4000, () =>{
      console.log('Server started on localhost:4000');
    })
}

main().catch((err) =>{
    console.log(err);
})
