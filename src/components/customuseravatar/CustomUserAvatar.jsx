import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/database-connection";
import Image from "next/image";
import Link from "next/link";

import * as Tooltip from "@radix-ui/react-tooltip";
import "./CustomUserAvatar.css";

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
    //might need to change this later
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link href={`/user/${user.firstName}-${user.lastName}`}>
            <div className="avatar-link">
              <Image
                src={avatarUrl}
                alt="User Avatar"
                width={48}
                height={48}
                className="avatar-image-header"
              />
              <span className="avatar-name">{user.firstName}</span>
            </div>
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="center"
            sideOffset={6}
            className="tooltip-content"
          >
            View Profile
            <Tooltip.Arrow className="tooltip-arrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
