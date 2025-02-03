-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "username" VARCHAR NOT NULL,
    "create_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refresh_token" VARCHAR,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_username" VARCHAR NOT NULL,
    "post_title" VARCHAR NOT NULL,
    "post_content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "comment_content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(2) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_liked" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "post_liked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_un_id" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_un_email" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_un_username" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "post_liked_un" ON "post_liked"("user_id", "post_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_liked" ADD CONSTRAINT "post_liked_fk" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_liked" ADD CONSTRAINT "post_liked_fk_1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
