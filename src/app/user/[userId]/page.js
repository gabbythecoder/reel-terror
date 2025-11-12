import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/utils/database-connection";
import Image from "next/image";
import reelterrorRating from "@/../public/reelterror-rating.png";

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
    <section>
      <div className="signout-container">
        <SignOutButton>
          <button className="signout-button">SIGN OUT</button>
        </SignOutButton>
      </div>

      <div className="user-profile-container">
        <h1 className="user-profile-title">
          {profile.first_name}&apos;s Profile
        </h1>

        <div className="user-profile post-wrapper">
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

          <p className="user-bio">Bio: {profile.bio}</p>
        </div>

        <div className="post-wrapper">
          <h2 className="my-posts-title">MY POSTS</h2>
          {posts.length === 0 ? (
            <p className="text-center">You haven&apos;t made any posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-container">
                <div className="post-left">
                  <Image
                    src={post.poster_url}
                    alt={post.title}
                    width={100}
                    height={120}
                    className="movie-poster"
                  />
                  <h3 className="movie-title">
                    {post.title} ({post.year})
                  </h3>
                </div>

                <div className="post-right">
                  <p className="user-thoughts">{post.thoughts}</p>

                  <div className="rating-icons">
                    <p>Rating:</p>
                    {Array.from({ length: post.rating }).map((_, i) => {
                      return (
                        <Image
                          key={i}
                          src={reelterrorRating}
                          alt="ReelTerror rating icon"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
