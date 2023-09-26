CREATE TABLE "follow_user" (
  "follower_id" INTEGER,
  "followed_id" INTEGER
);

CREATE TABLE "user" (
  "id" INTEGER SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "surname" VARCHAR(60) NOT NULL,
  "birthday" DATE,
  "gender" CHAR(1) NOT NULL,
  "email" VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "post" (
  "id" INTEGER SERIAL PRIMARY KEY,
  "user_id" INTEGER,
  "topic_id" INTEGER,
  "title" VARCHAR(100) NOT NULL,
  "content" TEXT NOT NULL,
  "creation_data" TIMESTAMP
);

CREATE TABLE "reaction" (
  "id" INTEGER SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "post_id" INTEGER NOT NULL,
  "type" VARCHAR(30) NOT NULL
);

CREATE TABLE "topic" (
  "id" INTEGER SERIAL PRIMARY KEY,
  "subject" VARCHAR(100) NOT NULL
);

CREATE TABLE "follows_topic" (
  "follower_id" INTEGER,
  "topic_id" INTEGER
);

COMMENT ON COLUMN "post"."user_id" IS 'Post Creator';

COMMENT ON COLUMN "post"."id_topic" IS 'Which topic belongs to';

ALTER TABLE "post" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("followed_id") REFERENCES "user" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");

ALTER TABLE "follows_topic" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follows_topic" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");
