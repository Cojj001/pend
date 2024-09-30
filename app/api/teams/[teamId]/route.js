import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  const { teamId } = params;

  try {
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const teamData = teamSnap.data();

    // Fetch team members
    const membersRef = doc(db, "teamMembers", teamId);
    const membersSnap = await getDoc(membersRef);
    const membersData = membersSnap.exists() ? membersSnap.data().members : [];

    const team = {
      id: teamSnap.id,
      ...teamData,
      members: membersData,
    };

    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
