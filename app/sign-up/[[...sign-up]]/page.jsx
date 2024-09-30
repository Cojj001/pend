import { SignUp } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

export default function Page() {
  return (
    <div className="log">
      <SignUp
        appearance={{
          baseTheme: shadesOfPurple,
        }}
        path="/sign-up"
      />
    </div>
  );
}
