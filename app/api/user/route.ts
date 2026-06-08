// app/api/user/route.ts

import data from "@/data/mock_data_may2026.json";
import { getCurrentUserId } from "@/lib/session";

export async function GET(): Promise<Response> {
  const userId = getCurrentUserId();

  const user = data.meta.reference_ids.citizen_users.find(
    (u) => u.user_id === userId
  );

  if (!user) return Response.json({ error: "not found" }, { status: 404 });

  return Response.json({
    name:    user.display_name.split(" ")[0],
    lastname: user.display_name.split(" ")[1] ?? "",
    phone:   user.phone,
  });
}