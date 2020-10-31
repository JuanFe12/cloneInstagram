import { Post } from "../entities/post.entities";
import { Mycontext } from "backend/types";
import { Resolver, Query, Ctx, Arg, Mutation } from "type-graphql";

@Resolver()
export class PostResolver{
  @Query(() => [Post])
  posts(@Ctx() {em}: Mycontext): Promise<Post[]> {
      return em.find(Post, {})
  }

  @Query(() => Post, { nullable: true})
  post(
    @Arg('id') id: number,
    @Ctx() {em}: Mycontext
    ): Promise<Post | null> {
      return em.findOne(Post, { id })
  }

  @Mutation(() => Post)
  async createPost(
    @Arg('title') title: string,
    @Arg('file') file: string,
    @Arg('author') author: string,
    @Ctx() {em}: Mycontext
    ): Promise<Post | null> {
      const post =  em.create(Post, { title, file, author})
      await em.persistAndFlush(post)
      return post;
  }
}