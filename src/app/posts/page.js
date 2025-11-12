import Link from "next/link";
import { db } from "@/utils/database-connection";
import Image from "next/image";
import reelterrorRating from "@/../public/reelterror-rating.png";
import { currentUser } from "@clerk/nextjs/server";

import { FaTrash } from "react-icons/fa6";

export default async function PostsPage() {
  const user = await currentUser();

  const allPosts = await db.query(
    `SELECT posts.id, posts.user_id, posts.thoughts, posts.rating, user_profiles.first_name, user_profiles.last_name, user_profiles.avatar, movie_list.title AS movie_title, movie_list.year, movie_list.poster_url FROM posts JOIN user_profiles ON posts.user_id = user_profiles.clerk_id JOIN movie_list ON posts.movie_id = movie_list.id ORDER BY posts.id DESC`
  );

  const posts = allPosts.rows;
  // console.log(posts);

  const allowedAvatars = ["ghostface", "jason", "michaelmyers"];

  return (
    <div className="post-wrapper">
      <h1 className="post-title">RECENT POSTS</h1>
      <Link href={"/new-post"} className="create-post">
        CREATE NEW POST
      </Link>

      {posts.length === 0 && <p>No posts yet!</p>}

      {posts.map((post) => {
        const avatarPic = allowedAvatars.includes(post.avatar)
          ? `/${post.avatar}-avatar-image.jpg`
          : "pumpkin-default-avatar-image.jpg";

        return (
          <div key={post.id} className="post-container">
            <div className="post-left">
              <Image
                src={post.poster_url}
                alt={post.movie_title}
                width={100}
                height={120}
                className="movie-poster"
              />
              <h3 className="movie-title">
                {post.movie_title} ({post.year})
              </h3>
            </div>

            <div className="post-right">
              <div className="user-info">
                <Image
                  src={avatarPic}
                  alt={`${post.first_name} avatar`}
                  width={40}
                  height={40}
                  className="avatar"
                />
                <p className="user-name">
                  {post.first_name} {post.last_name}
                </p>
              </div>

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

              {/* conditionally rendering the delete button for logged-in user that matches their posts */}
              {user && user.id === post.user_id && (
                <div className="flex justify-end">
                  <Link href={`/posts/${post.id}/delete`}>
                    <FaTrash className="text-red-600 w-5 h-5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
