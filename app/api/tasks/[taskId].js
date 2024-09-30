import prisma from "@/lib/prisma";

// GET, PUT, DELETE a single task by ID
export default async function handler(req, res) {
  const { method } = req;
  const { taskId } = req.query;

  switch (method) {
    case "GET":
      try {
        // Fetch a single task by ID
        const task = await prisma.task.findUnique({
          where: { id: taskId },
          include: {
            milestones: true,
            assignedUsers: true,
          },
        });
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch task" });
      }
      break;

    case "PUT":
      try {
        // Update an existing task
        const {
          title,
          description,
          dueDate,
          priority,
          milestones,
          assignedUsers,
        } = req.body;

        const updatedTask = await prisma.task.update({
          where: { id: taskId },
          data: {
            title,
            description,
            dueDate: new Date(dueDate),
            priority,
            milestones: {
              upsert: milestones.map((milestone) => ({
                where: { id: milestone.id || -1 },
                update: { name: milestone.name },
                create: { name: milestone.name },
              })),
            },
            assignedUsers: {
              set: assignedUsers.map((userId) => ({ id: userId })), // Resetting assigned users
            },
          },
        });

        res.status(200).json(updatedTask);
      } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
      }
      break;

    case "DELETE":
      try {
        // Delete a task by ID
        await prisma.task.delete({
          where: { id: taskId },
        });

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
