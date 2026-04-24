// import connectDB from "@/lib/db";
// import { Board } from "@/lib/models";
// import { fail, isObjectId, ok, parseJsonBody, requireUserId } from "@/lib/api/http";

// interface Params {
//   params: Promise<{ boardId: string }>;
// }

// export async function PATCH(request: Request, { params }: Params) {
//   const { userId, response } = await requireUserId();
//   if (response || !userId) {
//     return response;
//   }

//   const { boardId } = await params;
//   if (!isObjectId(boardId)) {
//     return fail("VALIDATION_ERROR", "Invalid boardId", 400);
//   }

//   const body = await parseJsonBody(request);
//   if (!body) {
//     return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
//   }

//   const name = typeof body.name === "string" ? body.name.trim() : "";
//   if (!name) {
//     return fail("VALIDATION_ERROR", "Board name is required", 400);
//   }

//   await connectDB();

//   const board = await Board.findOneAndUpdate(
//     { _id: boardId, userId },
//     { name },
//     { new: true }
//   ).lean();

//   if (!board) {
//     return fail("NOT_FOUND", "Board not found", 404);
//   }

//   return ok({ board });
// }
