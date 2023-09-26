CREATE TABLE "follow_user" (
  "follower_id" integer,
  "followed_id" integer
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "surname" varchar,
  "birthday" date,
  "gender" varchar,
  "email" varchar,
  "password" varchar,
  "created_at" timestamp
);

CREATE TABLE "post" (
  "id" integer PRIMARY KEY,
  "id_user" integer,
  "id_topic" integer,
  "title" varchar,
  "content" text,
  "creation_data" timestamp
);

CREATE TABLE "reaction" (
  "id" integer PRIMARY KEY,
  "id_user" integer,
  "id_post" integer,
  "type" varchar
);

CREATE TABLE "topic" (
  "id" integer PRIMARY KEY,
  "subject" varchar
);

CREATE TABLE "follows_topic" (
  "follower_id" integer,
  "topic_id" integer
);

COMMENT ON COLUMN "post"."id_user" IS 'Post Creator';

COMMENT ON COLUMN "post"."id_topic" IS 'Which topic belongs to';

ALTER TABLE "post" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("followed_id") REFERENCES "user" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("id_user") REFERENCES "user" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("id_post") REFERENCES "post" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("id_topico") REFERENCES "topic" ("id");

ALTER TABLE "follows_topic" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follows_topic" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");
