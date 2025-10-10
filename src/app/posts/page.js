// todo - render the posts from ALL user

import Link from "next/link";

export default function PostsPage() {
  return (
    <div>
      <h1>Post Page</h1>

      <Link href={"/new-post"}>Create New Post</Link>
    </div>
  );
}
