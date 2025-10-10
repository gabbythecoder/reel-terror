import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/database-connection";
import Image from "next/image";

export default async function CustomUserAvatar() {
  const user = await currentUser();

  if (!user) return null;

  const result = await db.query(
    `SELECT first_name, avatar FROM user_profiles WHERE clerk_id = $1 LIMIT 1`,
    [user.id]
  );

  const userAvatar = result.rows[0];
  if (!userAvatar) return null;

  const allowedAvatars = ["ghostface", "jason", "michaelmyers"];
  const isValidAvatar = allowedAvatars.includes(userAvatar.avatar);

  const avatarUrl = isValidAvatar
    ? `/${userAvatar.avatar}-avatar-image.jpg`
    : "/pumpkin-default-avatar-image.jpg";

  return (
    <div className="flex items-center gap-2">
      <Image
        src={avatarUrl}
        alt="User Avatar"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full border-2 border-red-500"
      />
      <span className="text-white font-semibold">{user.firstName}</span>
    </div>
  );
}
