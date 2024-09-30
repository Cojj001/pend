import { db } from "@/lib/firebase"; // Adjust your path as necessary
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

// POST: Add a new comment to a task
export async function POST(request) {
  try {
    const { taskId, userId, comment } = await request.json();

    const newComment = {
      taskId,
      userId,
      comment,
      createdAt: new Date().toISOString(), // Add timestamp for when the comment is created
    };

    const docRef = await addDoc(collection(db, "comments"), newComment);
    const createdComment = { id: docRef.id, ...newComment };

    return new Response(JSON.stringify(createdComment), { status: 201 });
  } catch (error) {
    console.error("POST /api/comments error:", error);
    return new Response(JSON.stringify({ error: "Failed to create comment" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// GET: Retrieve comments for a specific task
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return new Response(JSON.stringify({ error: "Task ID is required" }), {
        status: 400,
      });
    }

    const commentsQuery = query(
      collection(db, "comments"),
      where("taskId", "==", taskId)
    );
    const commentsSnapshot = await getDocs(commentsQuery);

    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.error("GET /api/comments error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch comments" }), {
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
