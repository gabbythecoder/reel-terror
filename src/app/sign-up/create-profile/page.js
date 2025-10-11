import Image from "next/image";
import ghostface from "@/../public/ghostface-avatar-image.jpg";
import jason from "@/../public/jason-avatar-image.jpg";
import michael from "@/../public/michaelmyers-avatar-image.jpg";

import { db } from "@/utils/database-connection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateProfilePage() {
  const user = await currentUser();

  async function handleSubmit(formData) {
    "use server";

    const formValues = {
      clerk_id: formData.get("clerk_id"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      bio: formData.get("bio"),
      avatar: formData.get("avatar"),
    };
    console.log(formValues);

    await db.query(
      `INSERT INTO user_profiles (clerk_id, first_name, last_name, bio, avatar) 
        VALUES ($1, $2, $3, $4, $5)`,
      [
        formValues.clerk_id,
        formValues.first_name,
        formValues.last_name,
        formValues.bio,
        formValues.avatar,
      ]
    );
    redirect("/posts");
  }

  return (
    <section>
      <div className="profile-form-container">
        <h1 className="profile-form-title">CREATE YOUR PROFILE</h1>
        <form action={handleSubmit} className="profile-form-content">
          <input type="hidden" name="clerk_id" value={user.id} />

          <div className="name-fields">
            <div>
              <label htmlFor="first_name">FIRST NAME:</label>
              <input type="text" name="first_name" id="first_name" required />
            </div>
            <div>
              <label htmlFor="last_name">LAST NAME:</label>
              <input type="text" name="last_name" id="last_name" required />
            </div>
          </div>

          <label htmlFor="bio" className="bio-label">BIO:</label>
          <textarea
            type="text"
            name="bio"
            id="bio"
            rows="3"
            column="10"
            required
            className="bio-textarea"
          />

          <fieldset className="profile-fieldset">
            <legend className="profile-legend">CHOOSE YOUR AVATAR</legend>
            <div className="avatar-options">
              <input
                hidden
                type="radio"
                name="avatar"
                id="avatar-ghostface"
                value="ghostface"
                required
              />
              <label htmlFor="avatar-ghostface">
                <Image
                  src={ghostface}
                  alt="a photo of ghostface"
                  width={100}
                  height={100}
                />
              </label>

              <input
                hidden
                type="radio"
                name="avatar"
                id="avatar-jason"
                value="jason"
                required
              />
              <label htmlFor="avatar-jason">
                <Image
                  src={jason}
                  alt="a photo of jason voorhees"
                  width={100}
                  height={100}
                />
              </label>

              <input
                hidden
                type="radio"
                name="avatar"
                id="avatar-michael"
                value="michaelmyers"
                required
              />
              <label htmlFor="avatar-michael">
                <Image
                  src={michael}
                  alt="a photo of michael myers"
                  width={100}
                  height={100}
                />
              </label>
            </div>
          </fieldset>

          <button type="submit" className="profile-button">CREATE PROFILE</button>
        </form>
      </div>
    </section>
  );
}
