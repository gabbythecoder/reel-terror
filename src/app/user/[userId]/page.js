//route -> "user/:userId" (you could use the username as the dynamic params instead)

// todo - render user's info and user's personal posts
// - auth() -> userId
// - currentUser() -> other user info (there is a JSON object in your Clerk app for reference)
// - render user's data and user's post

import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default function UserIdPage() {
  return (
    <div>
      <h1>User Profile Page</h1>

      <SignOutButton>
        <button>Sign Out</button>
      </SignOutButton>
    </div>
  );
}
