// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import { getSession } from "@/lib/auth/auth";

// export const ALLOWED_STATUSES = new Set([
//   "wish-list",
//   "applied",
//   "interviewing",
//   "offered",
//   "rejected",
// ]);

// export function ok<T>(data: T, status = 200) {
//   return NextResponse.json({ data }, { status });
// }

// export function fail(code: string, message: string, status: number) {
//   return NextResponse.json(
//     {
//       error: {
//         code,
//         message,
//       },
//     },
//     { status }
//   );
// }

// export async function requireUserId() {
//   const session = await getSession();
//   const userId = session?.user?.id;

//   if (!userId) {
//     return {
//       userId: null,
//       response: fail("UNAUTHENTICATED", "Authentication required", 401),
//     };
//   }

//   return { userId, response: null };
// }

// export async function parseJsonBody(request: Request) {
//   try {
//     return (await request.json()) as Record<string, unknown>;
//   } catch {
//     return null;
//   }
// }

// export function isObjectId(value: unknown): value is string {
//   return typeof value === "string" && mongoose.Types.ObjectId.isValid(value);
// }

// export function clampIndex(index: number, min: number, max: number) {
//   return Math.max(min, Math.min(index, max));
// }

// export function normalizeIds(ids: Array<string | mongoose.Types.ObjectId>) {
//   return ids.map((id) => id.toString());
// }
