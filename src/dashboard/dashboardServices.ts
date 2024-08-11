"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { config } from "@/config";

const sessionsStatisticsSchema = z.object({
  success: z.boolean(),
  data: z.object({
    usersCount: z.number(),
    activeSessionsCount: z.number(),
    averageActiveSessions: z.number(),
  }),
});

export async function getSessionsStatistics() {
  const cookieStore = cookies();
  const response = await fetch(
    `${config.server.basePath}${config.server.sessionStatsPath}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
      next: {
        tags: ["sessions-stats"],
      },
    },
  );
  if (!response.ok) {
    return undefined;
  }
  const json = await response.json();
  const sessionStats = sessionsStatisticsSchema.parse(json);
  return sessionStats.data;
}

const usersStatisticsSchema = z.object({
  data: z.array(
    z.object({
      lastLoggedOutAt: z.string().nullable(),
      loggedInCount: z.number(),
      createdAt: z.string(),
    }),
  ),
});

export type UsersStatistics = z.infer<typeof usersStatisticsSchema>;

export async function getUsersStatistics() {
  const cookieStore = cookies();
  const response = await fetch(
    `${config.server.basePath}${config.server.userStatsPath}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore
          .getAll()
          .map(({ name, value }) => `${name}=${value}`)
          .join("; "),
      },
      next: {
        tags: ["users-stats"],
      },
    },
  );
  if (!response.ok) {
    return undefined;
  }
  const json = await response.json();
  const usersStats = usersStatisticsSchema.parse(json);
  return usersStats.data;
}
