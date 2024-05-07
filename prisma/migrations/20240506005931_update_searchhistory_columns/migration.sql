/*
  Warnings:

  - You are about to drop the column `phoneNumberSearched` on the `SearchHistory` table. All the data in the column will be lost.
  - Added the required column `callerName` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `callerType` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carrierName` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formattedNumber` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineTypeId` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `SearchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchHistory" DROP COLUMN "phoneNumberSearched",
ADD COLUMN     "callerName" TEXT NOT NULL,
ADD COLUMN     "callerType" TEXT NOT NULL,
ADD COLUMN     "carrierName" TEXT NOT NULL,
ADD COLUMN     "formattedNumber" TEXT NOT NULL,
ADD COLUMN     "lineTypeId" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "valid" BOOLEAN NOT NULL DEFAULT false;
