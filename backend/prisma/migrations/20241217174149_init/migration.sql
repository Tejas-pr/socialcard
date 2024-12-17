-- CreateTable
CREATE TABLE "CreateUser" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreateUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLink" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "github" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "leetcode" TEXT NOT NULL,
    "twitter" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "UUID" INTEGER NOT NULL,

    CONSTRAINT "userLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreateUser_username_key" ON "CreateUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CreateUser_email_key" ON "CreateUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userLink_userid_key" ON "userLink"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "userLink_UUID_key" ON "userLink"("UUID");

-- AddForeignKey
ALTER TABLE "userLink" ADD CONSTRAINT "userLink_userid_fkey" FOREIGN KEY ("userid") REFERENCES "CreateUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
