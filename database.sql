-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR(1000) NOT NULL,
    "role" INTEGER DEFAULT 1,
    "approved" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "questions" (
    "id" SERIAL PRIMARY KEY,                -- Unique identifier, auto-incremented
    "question" VARCHAR(1000),               -- user question input      
    "answer" VARCHAR(1000),                 -- admin answer input        
    "answered" BOOLEAN DEFAULT FALSE,       -- Whether the question has been answered (defaults to false)
    "unread" BOOLEAN DEFAULT TRUE,          -- Whether the question has been read (defaults to true)
    "associated_article_url" VARCHAR(255),  -- Optional field for a URL to an associated article
    "question_date" DATE,                   -- The date when the question was posted
    "flagged" BOOLEAN DEFAULT FALSE,        -- Whether the question has been flagged (defaults to false)
    "user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE  -- Foreign key to the 'user' table
);

CREATE TABLE "articles" (
    "id" SERIAL PRIMARY KEY,               -- auto-incrementing primary key
    "title" VARCHAR(255) NOT NULL,          -- title of the article, max length 255
    "subtitle" VARCHAR(255),                -- subtitle of the article, max length 255
    "body" TEXT,                            -- body/content of the article (TEXT for flexibility)
    "article_url" VARCHAR(1000) NOT NULL             -- URL of the article
);

CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,               -- auto-incrementing primary key
    "filename" VARCHAR(255) NOT NULL,        -- filename of the file, max length 255
    "data" BYTEA                            -- learn more about BYTEA at https://shorturl.at/OANxy
);
CREATE TABLE "savedFile" (
    "id" SERIAL PRIMARY KEY,               -- auto-incrementing primary key
    "file_id" INT REFERENCES "files" (id) ON DELETE CASCADE NOT NULL, -- foreign key referencing the files table
    "user_id" INTEGER REFERENCES "user" (id) ON DELETE CASCADE -- foreign key referencing the user table
);

CREATE TABLE "savedArticle" (
    "id" SERIAL PRIMARY KEY,               -- auto-incrementing primary key
    "article_id" INT REFERENCES "articles" (id) ON DELETE CASCADE NOT NULL, -- foreign key referencing the articles table
    "user_id" INTEGER REFERENCES "user" (id) ON DELETE CASCADE -- foreign key referencing the user table
);

CREATE TABLE "articles_files" (
    "id" SERIAL PRIMARY KEY,               -- auto-incrementing primary key
    "article_id" INTEGER REFERENCES "articles"("id") ON DELETE CASCADE,  -- foreign key referencing articles.id
    "file_id" INTEGER REFERENCES "files"("id") ON DELETE CASCADE         -- foreign key referencing files.id
);


