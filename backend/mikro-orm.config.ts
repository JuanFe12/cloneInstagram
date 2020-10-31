import { Post } from './entities/post.entities';
import { User } from './entities/user.entities';
import { MikroORM } from '@mikro-orm/core';
import  path from 'path'

export default {
    migrations:{
      path: path.join(__dirname, './migrations'),
      pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: 'instagram',
    type: 'postgresql',
    user: 'postgres',
    password: 'asdqwe123',
    entities: [Post, User]
 } as Parameters<typeof MikroORM.init>[0];