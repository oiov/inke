import { ContentItem } from "../types/note";
import prisma from "./prisma";

export async function createShareNote(json: ContentItem, uid: string) {
  return await prisma.shareNote.create({
    data: {
      userId: uid,
      localId: json.id,
      data: JSON.stringify(json),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  });
}

export async function findShareByLocalId(id: string, uid?: string) {
  if (uid) {
    return await prisma.shareNote.findFirst({
      where: {
        localId: id,
        userId: uid,
        deletedAt: null,
      },
    });
  } else {
    return await prisma.shareNote.findFirst({
      where: {
        localId: id,

        deletedAt: null,
      },
    });
  }
}
export async function findShareByDBId(id: string) {
  return await prisma.shareNote.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}
export async function findUserShares(uid: string) {
  return await prisma.shareNote.findMany({
    where: {
      userId: uid,
      deletedAt: null,
    },
  });
}

export async function updateShareNote(json: ContentItem, id: string) {
  return await prisma.shareNote.update({
    where: {
      id,
    },
    data: {
      data: JSON.stringify(json),
      updatedAt: new Date(),
    },
  });
}

export async function deleteShareNote(id: string) {
  return await prisma.shareNote.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
