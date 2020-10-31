import { Migration } from '@mikro-orm/migrations';

export class Migration20201031164957 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "name" text not null, "last_name" text not null, "email" text not null, "password" text not null, "photo_profile" text not null, "resume_profile" text not null);');

    this.addSql('create table "post" ("id" serial primary key, "create_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "title" text not null, "author" text not null, "file" text not null);');
  }

}
