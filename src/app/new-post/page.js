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
      return redirect("/posts");
    } catch (error) {
      console.error("Database failed to insert:", error);
    }
  }

  return (
    <div className="new-posts-form-container">
      <h2>Create A New Post</h2>

      <form action={handleSubmit} className="new-posts-content">
        <div className="form-group">
        <label htmlFor="movie_id">Movie:</label>
        <select name="movie_id" id="movie_id" className="input-select">
          <option value="">-- Choose a movie --</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.title} ({movie.year})
            </option>
          ))}
        </select>
        </div>

        <div className="form-group">
        <label htmlFor="thoughts">Thoughts:</label>
        <textarea
          type="text"
          name="thoughts"
          id="thoughts"
          rows="4"
          cols="10"
          placeholder="Add your thoughts here"
          className="input-textarea"
          required
        />
        </div>

        <fieldset className="form-group rating-group">
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

        <button type="submit" className="submit-button">Submit</button>
      </form>

      <Link href={"/posts"} className="go-back-button">Go Back</Link>
    </div>
  );
}