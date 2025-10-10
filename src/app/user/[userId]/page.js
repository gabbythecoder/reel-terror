import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/database-connection";
import Image from "next/image";

export default async function UserIdPage() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const profileQuery = await db.query(
    `SELECT first_name, last_name, bio, avatar FROM user_profiles WHERE clerk_id = $1`,
    [user.id]
  );

  const profile = profileQuery.rows[0];

  if (!profile) {
    redirect("/sign-up/create-profile");
  }

  let postsResult;

  try {
    postsResult = await db.query(
      `SELECT posts.id, posts.thoughts, posts.rating, movie_list.title, movie_list.year, movie_list.poster_url FROM posts JOIN movie_list ON posts.movie_id = movie_list.id WHERE posts.user_id = $1 ORDER BY posts.id DESC`,
      [user.id]
    );
  } catch (error) {
    console.error("Error loading profile/posts:", error);
  }

  const posts = postsResult ? postsResult.rows : [];

  return (
    <div>
      <h1>{profile.first_name}&apos;s Profile</h1>

      <div>
        <Image
          src={
            ["ghostface", "jason", "michaelmyers"].includes(profile.avatar)
              ? `/${profile.avatar}-avatar-image.jpg`
              : "/pumpkin-default-avatar-image.jpg"
          }
          alt="users avatar"
          width={100}
          height={100}
        />
      </div>

      <p>{profile.bio}</p>
      <SignOutButton>
        <button>Sign Out</button>
      </SignOutButton>

      <section>
        <h2>My Posts</h2>
        {posts.length === 0 ? (
          <p>You haven&apos;t made any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <h3>
                {post.title} ({post.year})
              </h3>
              <p>{post.thoughts}</p>
              <p>Rating: {post.rating}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
