"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { config } from "@/config";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const userSchema = z.object({
  data: z.object({
    name: z.string(),
    emailVerified: z.boolean(),
    email: z.string(),
    googleId: z.string().nullable(),
    facebookId: z.string().nullable(),
    createdAt: z.string(),
  }),
});

export async function getUser() {
  const cookieStore = cookies();
  const response = await fetch(
    `${config.server.basePath}${config.server.getUserPath}`,
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
        tags: ["user-info"],
      },
    },
  );
  if (!response.ok) {
    return undefined;
  }
  const userRaw = await response.json();
  const user = userSchema.parse(userRaw);
  return user.data;
}

export async function redirectApp(path: string) {
  redirect(path);
}

export async function revalidateApp(tag: string) {
  revalidateTag(tag);
}

export async function resendEmailVerification() {
  const cookieStore = cookies();
  const path = `${config.server.basePath}${config.server.emailVerificationPath}`;
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join("; "),
    },
  });
  const json = await response.json();
}
