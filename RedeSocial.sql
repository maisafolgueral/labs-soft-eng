CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  "surname" VARCHAR(60) NOT NULL,
  "birthday" DATE,
  "gender" CHAR(1) NOT NULL,
  "email" VARCHAR NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "is_active" BOOLEAN NOT NULL,
  "is_bot" BOOLEAN NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "topic_id" INTEGER NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "reaction" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "post_id" INTEGER NOT NULL,
  "type" VARCHAR(30) NOT NULL
  "created_at" TIMESTAMP
);

CREATE TABLE "comment" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "post_id" INTEGER NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "topic" (
  "id" SERIAL PRIMARY KEY,
  "subject" VARCHAR(100) NOT NULL
  "created_at" TIMESTAMP
);

CREATE TABLE "feedback" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "subject" VARCHAR(100) NOT NULL,
  "description" TEXT NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "follow_user" (
  "follower_id" INTEGER NOT NULL,
  "followed_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP
);

CREATE TABLE "follow_topic" (
  "follower_id" INTEGER NOT NULL,
  "topic_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP
);

COMMENT ON COLUMN "post"."user_id" IS 'Post Creator';

COMMENT ON COLUMN "post"."id_topic" IS 'Which topic belongs to';

ALTER TABLE "post" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "reaction" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("post_id") REFERENCES "post" ("id");

ALTER TABLE "feedback" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow_user" ADD FOREIGN KEY ("followed_id") REFERENCES "user" ("id");

ALTER TABLE "follow_topic" ADD FOREIGN KEY ("follower_id") REFERENCES "user" ("id");

ALTER TABLE "follow_topic" ADD FOREIGN KEY ("topic_id") REFERENCES "topic" ("id");
