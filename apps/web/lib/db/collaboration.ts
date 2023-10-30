import { ContentItem } from "../types/note";
import prisma from "./prisma";

export async function createCollaboration(
  userId: string,
  localId: string,
  roomId: string,
  title: string,
) {
  return await prisma.collaboration.create({
    data: {
      userId,
      localId,
      roomId,
      title,
      click: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      expired: null,
    },
  });
}

export async function findCollaborationByRoomId(roomId: string, uid?: string) {
  if (uid) {
    return await prisma.collaboration.findFirst({
      where: {
        roomId,
        userId: uid,
        deletedAt: null,
        expired: null,
      },
    });
  } else {
    return await prisma.collaboration.findFirst({
      where: {
        roomId,
        deletedAt: null,
        expired: null,
      },
    });
  }
}
// 用户当前本地笔记是否已加入协作
export async function findCollaborationBylocalId(
  localId: string,
  userId: string,
) {
  return await prisma.collaboration.findFirst({
    where: {
      userId,
      localId,
      deletedAt: null,
      expired: null,
    },
    select: {
      roomId: true,
    },
  });
}
// 邀请中转页调用
export async function findCollaborationByDBId(id: string) {
  return await prisma.collaboration.findFirst({
    where: {
      id,
      deletedAt: null,
      expired: null,
    },
  });
}

// 该协作加入人数
export async function findCollaborationInviteCount(id: string) {
  return await prisma.collaboration.count({
    where: {
      id,
      deletedAt: null,
      expired: null,
    },
  });
}
// 用户所有参与的协作分享
export async function findUserCollaborations(uid: string) {
  return await prisma.shareNote.findMany({
    where: {
      userId: uid,
      deletedAt: null,
    },
  });
}

// export async function updateCollaboration(click: number, id: string) {
//   return await prisma.collaboration.update({
//     where: {
//       id,
//     },
//     data: {
//       click,
//       updatedAt: new Date(),
//     },
//   });
// }
export async function updateCollaborationClick(id: string, pre: number) {
  return await prisma.collaboration.update({
    where: {
      id,
    },
    data: {
      click: pre + 1,
    },
  });
}

export async function deleteCollaborationNote(id: string) {
  return await prisma.collaboration.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}
