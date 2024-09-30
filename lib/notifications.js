import { db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function sendNotification(userId, notification) {
  try {
    const notificationRef = doc(db, "notifications", `${userId}_${Date.now()}`);
    await setDoc(notificationRef, {
      userId,
      ...notification,
      read: false,
      createdAt: serverTimestamp(),
    });
    console.log(`Notification sent to user ${userId}`);
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}
