import { db } from "@/lib/firebase"; // Import Firestore
import {
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(request) {
  const { teamId, userId } = await request.json();
  try {
    // Add a new team member in Firestore
    const teamMembersCollection = collection(db, "teamMembers");
    const docRef = await addDoc(teamMembersCollection, {
      teamId,
      userId,
    });
    const teamMember = { id: docRef.id, teamId, userId };
    return new Response(JSON.stringify(teamMember), { status: 201 });
  } catch (error) {
    console.error("POST /api/teamMembers error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add team member" }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { teamId, userId } = await request.json();
  try {
    // Find and delete the team member in Firestore
    const teamMembersCollection = collection(db, "teamMembers");
    const q = query(
      teamMembersCollection,
      where("teamId", "==", teamId),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref); // Delete each document found
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("DELETE /api/teamMembers error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to remove team member" }),
      { status: 500 }
    );
  }
}
