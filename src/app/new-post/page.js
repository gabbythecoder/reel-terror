import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/database-connection";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewPost() {
  const user = await currentUser();

  const movieQuery = await db.query("SELECT id, title, year FROM movie_list");
  const movies = movieQuery.rows;

  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      movie_id: formData.get("movie_id"),
      thoughts: formData.get("thoughts"),
      rating: formData.get("rating"),
    };

    if (!formValues.movie_id || !formValues.thoughts || !formValues.rating) {
      console.error("Missing required fields.");
      return;
    }

    try {
      await db.query(
        `INSERT INTO posts (user_id, movie_id, thoughts, rating) VALUES ($1, $2, $3, $4)`,
        [user.id, formValues.movie_id, formValues.thoughts, formValues.rating]
      );
      redirect("/posts");
    } catch (error) {
      console.error("Database failed to insert:", error);
    }
  }

  return (
    <div>
      <h1>Create A New Post</h1>

      <form action={handleSubmit}>
        <label htmlFor="movie_id">Movie:</label>
        <select name="movie_id" id="movie_id">
          <option value="">-- Choose a movie --</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>

        <label htmlFor="thoughts">Thoughts:</label>
        <textarea
          type="text"
          name="thoughts"
          id="thoughts"
          required
          placeholder="Add your thoughts here"
        />

        <fieldset>
          <legend>Rating:</legend>

          <input type="radio" name="rating" id="rating1" value="1" required />
          <label htmlFor="rating1">1</label>

          <input type="radio" name="rating" id="rating2" value="2" required />
          <label htmlFor="rating1">2</label>

          <input type="radio" name="rating" id="rating3" value="3" required />
          <label htmlFor="rating3">3</label>

          <input type="radio" name="rating" id="rating4" value="4" required />
          <label htmlFor="rating4">4</label>

          <input type="radio" name="rating" id="rating5" value="5" required />
          <label htmlFor="rating5">5</label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <Link href={"/posts"}>Go Back</Link>
    </div>
  );
}