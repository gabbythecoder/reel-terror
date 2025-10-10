import Link from "next/link";
import { db } from "@/utils/database-connection";
import Image from "next/image";

export default async function PostsPage() {
  const allPosts = await db.query(
    `SELECT posts.id, posts.thoughts, posts.rating, user_profiles.first_name, user_profiles.last_name, user_profiles.avatar, movie_list.title AS movie_title, movie_list.year, movie_list.poster_url FROM posts JOIN user_profiles ON posts.user_id = user_profiles.clerk_id JOIN movie_list ON posts.movie_id = movie_list.id ORDER BY posts.id DESC`
  );

  const posts = allPosts.rows;

  const allowedAvatars = ["ghostface", "jason", "michaelmyers"];

  return (
    <div className="posts-container">
      <h1>Recent Posts</h1>
      <Link href={"/new-post"}>Create New Post</Link>

      {posts.length === 0 && <p>No posts yet!</p>}

      {posts.map((post) => {
        const avatarPic = allowedAvatars.includes(post.avatar)
          ? `/${post.avatar}-avatar-image.jpg`
          : "pumpkin-default-avatar-image.jpg";

        return (
          <div key={post.id}>
            <div>
              <Image
                src={post.poster_url}
                alt={post.movie_title}
                width={100}
                height={120}
              />
              <h3>{post.movie_title}</h3>
            </div>

            <div>
              <Image
                src={avatarPic}
                alt={`${post.first_name} avatar`}
                width={40}
                height={40}
              />
              <p>
                {post.first_name} {post.last_name}
              </p>
            </div>

            <p>{post.thoughts}</p>
            <p>Rating: {post.rating}</p>
          </div>
        );
      })}
    </div>
  );
}
