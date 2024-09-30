import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { sendNotification } from "@/lib/notifications";

export async function POST(request, { params }) {
  const { teamId } = params;

  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Check if the team exists
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    // Check if the user exists in the system
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json(
        { error: "User not found in the system" },
        { status: 404 }
      );
    }

    // Add the new member to the team
    const newMember = {
      id: userSnap.id,
      name,
      email,
    };

    const membersRef = doc(db, "teamMembers", teamId);

    // Use setDoc with merge option to create the document if it doesn't exist
    await setDoc(
      membersRef,
      {
        members: arrayUnion(newMember),
      },
      { merge: true }
    );

    // Send in-app notification to the added user
    await sendNotification(userSnap.id, {
      title: "You've been added to a team",
      body: `You have been added to the team with ID: ${teamId}`,
      type: "team_invite",
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error adding team member:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
