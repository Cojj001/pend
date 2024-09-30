import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Create a new team
export async function POST(request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name } = await request.json();
    if (!name) {
      return NextResponse.json(
        { error: "Team name is required" },
        { status: 400 }
      );
    }

    const newTeam = {
      name,
      createdBy: userId,
      members: [userId],
      createdAt: new Date().toISOString(),
    };

    const teamsCollection = collection(db, "teams");
    const docRef = await addDoc(teamsCollection, newTeam);
    const team = { id: docRef.id, ...newTeam };

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("POST /api/teams error:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}

// Fetch all teams for the current user
export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const teamsCollection = collection(db, "teams");
    const q = query(
      teamsCollection,
      where("members", "array-contains", userId)
    );
    const teamsSnapshot = await getDocs(q);

    const teams = teamsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("GET /api/teams error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
