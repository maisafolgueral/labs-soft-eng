CREATE TABLE "segue_usuario" (
  "seguidor_id" integer,
  "seguido_id" integer
);

CREATE TABLE "usuario" (
  "id" integer PRIMARY KEY,
  "nome" varchar,
  "sobrenome" varchar,
  "sexo" varchar,
  "email" varchar,
  "senha" varchar,
  "created_at" timestamp
);

CREATE TABLE "publicacao" (
  "id" integer PRIMARY KEY,
  "id_usuario" integer,
  "id_topico" integer,
  "titulo" varchar,
  "conteudo" text,
  "data_criacao" timestamp
);

CREATE TABLE "reacao" (
  "id" integer PRIMARY KEY,
  "id_usuario" integer,
  "id_publicacao" integer,
  "tipo" varchar
);

CREATE TABLE "topico" (
  "id" integer PRIMARY KEY,
  "assunto" varchar
);

CREATE TABLE "segue_topico" (
  "seguidor_id" integer,
  "topico_id" integer
);

COMMENT ON COLUMN "publicacao"."id_usuario" IS 'Criador da publicacao';

COMMENT ON COLUMN "publicacao"."id_topico" IS 'A qual topico pertence';

ALTER TABLE "publicacao" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id");

ALTER TABLE "segue_usuario" ADD FOREIGN KEY ("seguidor_id") REFERENCES "usuario" ("id");

ALTER TABLE "segue_usuario" ADD FOREIGN KEY ("seguido_id") REFERENCES "usuario" ("id");

ALTER TABLE "reacao" ADD FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id");

ALTER TABLE "reacao" ADD FOREIGN KEY ("id_publicacao") REFERENCES "publicacao" ("id");

ALTER TABLE "publicacao" ADD FOREIGN KEY ("id_topico") REFERENCES "topico" ("id");

ALTER TABLE "segue_topico" ADD FOREIGN KEY ("seguidor_id") REFERENCES "usuario" ("id");

ALTER TABLE "segue_topico" ADD FOREIGN KEY ("topico_id") REFERENCES "topico" ("id");
