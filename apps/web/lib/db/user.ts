import prisma from "./prisma";

// get all users from user schema
export const getUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
    select: { name: true, image: true },
  });
};

export const updateUserName = async (id: string, name: string) => {
  return await prisma.user.update({ data: { name }, where: { id } });
};
