import { db } from "@/utils/database-connection";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function DeletePage({ params }) {
  const postId = (await params).postId;
  const user = await currentUser();

  const postQuery = await db.query(
    `SELECT id, user_id, thoughts, movie_id FROM posts WHERE id = $1`,
    [postId]
  );

  const post = postQuery.rows[0];

  if (!post) {
    notFound();
  }

  if (post.user_id !== user.id) {
    redirect("/posts");
  }

  async function handleDelete() {
    "use server";

    await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);

    revalidatePath("/posts");

    redirect("/posts");
  }

  return (
    <section>
      <div className="delete-container">
        <h2>Are you sure you want to delete this post?</h2>
        <form action={handleDelete}>
          <input type="hidden" name="postId" value={postId} />
          <div className="delete-actions">
            <Link href="/posts" className="cancel-link">
              CANCEL
            </Link>
            <button type="submit" className="delete-button">
              YES, DELETE
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
