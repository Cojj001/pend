import { db } from "@/lib/firebase";
import {
  doc,
  deleteDoc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// GET a specific milestone or fetch all milestones
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId"); // Check if taskId is passed to get milestones for a specific task

    let milestones = [];
    if (taskId) {
      // Fetch milestones for a specific task
      const milestonesQuery = query(
        collection(db, "milestones"),
        where("taskId", "==", taskId)
      );
      const milestonesSnapshot = await getDocs(milestonesQuery);
      milestones = milestonesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      // Fetch all milestones
      const milestonesSnapshot = await getDocs(collection(db, "milestones"));
      milestones = milestonesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }

    return new Response(JSON.stringify(milestones), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/milestones error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch milestones" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST (create a new milestone)
export async function POST(req) {
  try {
    const { title, status, taskId } = await req.json();

    const newMilestone = {
      title,
      status: status || "PENDING", // Default status if not provided
      taskId,
    };

    const docRef = await addDoc(collection(db, "milestones"), newMilestone);
    const createdMilestone = { id: docRef.id, ...newMilestone };

    return new Response(JSON.stringify(createdMilestone), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST /api/milestones error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create milestone" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// PUT (update a milestone)
export async function PUT(req) {
  try {
    const { id, title, status } = await req.json();

    const milestoneRef = doc(db, "milestones", id);
    const updatedData = { title, status };

    await updateDoc(milestoneRef, updatedData);
    const updatedMilestone = { id, ...updatedData };

    return new Response(JSON.stringify(updatedMilestone), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PUT /api/milestones error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update milestone" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// DELETE (remove a milestone)
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    // Delete the milestone
    const milestoneRef = doc(db, "milestones", id);
    await deleteDoc(milestoneRef);

    return new Response(JSON.stringify({ message: "Milestone deleted", id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("DELETE /api/milestones error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete milestone" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// OPTIONS handler
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, PUT, DELETE",
    },
  });
}
