import { auth } from "@clerk/nextjs/server";

// getting user detail and role from clerk
const { sessionClaims } = auth();

// to access role in a server component
export const role = (sessionClaims?.metadata as { role?: string })?.role;