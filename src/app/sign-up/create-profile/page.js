// todo -  want the user to create a profile using form to add a nickname, bio, etc..

//when the user signs-up, Clerk creates a userId
//the userId does not exist until the user has signed-up!
//redirects -> use them to improve the user flow (use a diagram for help)
//make sure Clerk redirects are in the .env file
//once the user has created their profile, redirect them to either their personal profile page or the posts timeline

import Image from "next/image";
import ghostface from "@/../public/ghostface-avatar-image.jpg";
import jason from "@/../public/jason-avatar-image.jpg";
import michael from "@/../public/michael-myers-avatar-image.jpg";

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

    db.query(
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
    <>
      <h1>Create your profile!</h1>
      <form action={handleSubmit}>
        <input type="hidden" name="clerk_id" value={user.id} />

        <label htmlFor="first_name">First Name:</label>
        <input type="text" name="first_name" id="first_name" required />
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" name="last_name" id="last_name" required />
        <label htmlFor="bio">Bio:</label>
        <textarea type="text" name="bio" id="bio" required />

        <fieldset>
          <legend>Choose Your Avatar:</legend>
          <input
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
        </fieldset>

        <button type="submit">Create Profile</button>
      </form>
    </>
  );
}
