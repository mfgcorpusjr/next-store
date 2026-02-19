import { currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default async function UserIcon() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <Avatar size="sm">
      <AvatarImage src={user.imageUrl} />
    </Avatar>
  );
}
