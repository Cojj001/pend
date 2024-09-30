import { SignIn } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import "../../../styles/globals.css";

export default function Page() {
  return (
    <div className=" log">
      <SignIn
        appearance={{
          baseTheme: shadesOfPurple,
        }}
        path="/sign-in"
      />
    </div>
  );
}
