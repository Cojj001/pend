import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";

export async function POST(request) {
  const { taskId, userIds } = await request.json();

  try {
    // Fetch the task document reference
    const taskRef = doc(db, "tasks", taskId);
    const taskDoc = await getDoc(taskRef);

    if (!taskDoc.exists()) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    // Update the task by adding user IDs to the assignedUsers field
    await updateDoc(taskRef, {
      assignedUsers: arrayUnion(...userIds), // Add users without duplicating existing ones
    });

    return new Response(JSON.stringify({ message: "Task assigned to users" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error assigning task to users:", error);
    return new Response(JSON.stringify({ error: "Failed to assign task" }), {
      status: 500,
    });
  }
}
