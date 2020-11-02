import 'reflect-metadata';
import { UserResolver } from './resolvers/user.resolvers';
import { PostResolver } from './resolvers/post.resolvers';
import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
import express from "express";
import { Response } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello.resolvers";
import microConfig from './mikro-orm.config';
import redis from 'redis'; 
import session from 'express-session';
import connectRedis from 'connect-redis';

dotenv.config({
  path: '.env'
});

const main = async () =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    //const post = orm.em.create(Post, {title: 'my first post', file:'image.jpge', author: 'juan'});
    //await orm.em.persistAndFlush(post)
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
      session({
        name: 'first cookie',
        store: new RedisStore({ 
          client: redisClient,
          disableTouch: true
        }),
        cookie:{
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
          httpOnly: true,
          sameSite: "lax", //csrf
          secure: true //cookie only works in https
        },
        saveUninitialized: false,
        secret: 'keyboard cat',
        resave: false
      })
    )

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false
      }),
      context: ({req, res}) =>({ em: orm.em, req, res})
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
