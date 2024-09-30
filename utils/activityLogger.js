import prisma from "../lib/prisma";

export const logActivity = async (action, userId, taskId) => {
  await prisma.activityLog.create({
    data: {
      action,
      userId,
      taskId,
    },
  });
};
