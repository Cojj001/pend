import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

// Real-time GET handler with Firestore
export async function GET(req) {
  try {
    const tasksCollection = collection(db, "tasks");
    let tasks = [];

    // Setting up real-time listener with onSnapshot
    const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
      tasks = snapshot.docs.map((doc) => {
        const taskData = doc.data();
        return {
          ...taskData,
          id: doc.id, // Include the document ID
          status: taskData.status ?? "PENDING", // Default status to "PENDING"
        };
      });
    });

    // Close the listener after retrieving the tasks (optional for initial load)
    unsubscribe();

    return new Response(JSON.stringify(tasks), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/tasks error:", error); // Log the error for debugging
    return new Response(JSON.stringify({ error: "Failed to fetch tasks" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST handler to add a task to Firestore and update its status
export async function POST(req) {
  try {
    let taskStatus = "PENDING";
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      milestones = [],
      assignedUsers = [],
    } = await req.json();

    console.log("Parsed request body:", {
      title,
      description,
      dueDate,
      priority,
      status,
      milestones,
      assignedUsers,
    });

    const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status value: ${status}`);
    }

    const formattedMilestones = milestones.map((milestone) => ({
      name: milestone.name || "Unnamed Milestone", // Default name if not provided
      status: milestone.status || "PENDING", // Default status if not provided
    }));

    // Add the new task to Firestore
    const taskRef = await addDoc(collection(db, "tasks"), {
      title,
      description,
      dueDate: new Date(dueDate),
      priority,
      status,
      milestones: formattedMilestones,
      assignedUsers, // Assuming assignedUsers is an array of user IDs
    });

    const taskId = taskRef.id;

    // Check the initial status based on milestones
    const allCompleted = formattedMilestones.every(
      (m) => m.status === "COMPLETED"
    );
    const someCompleted = formattedMilestones.some(
      (m) => m.status === "COMPLETED"
    );

    if (allCompleted) {
      taskStatus = "COMPLETED";
    } else if (someCompleted) {
      taskStatus = "IN_PROGRESS";
    }

    // Update the task status based on milestones
    await updateDoc(doc(db, "tasks", taskId), {
      status: taskStatus,
    });

    return new Response(
      JSON.stringify({ id: taskId, title, status: taskStatus }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return new Response(JSON.stringify({ error: "Failed to create task" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// OPTIONS handler
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST",
    },
  });
}
