// import connectDB from "@/lib/db";
// import { Board, Column } from "@/lib/models";
// import {
//   clampIndex,
//   fail,
//   isObjectId,
//   normalizeIds,
//   ok,
//   parseJsonBody,
//   requireUserId,
// } from "@/lib/api/http";

// export async function POST(request: Request) {
//   const { userId, response } = await requireUserId();
//   if (response || !userId) {
//     return response;
//   }

//   const body = await parseJsonBody(request);
//   if (!body) {
//     return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
//   }

//   const boardId = body.boardId;
//   const name = typeof body.name === "string" ? body.name.trim() : "";
//   const incomingOrder = body.order;

//   if (!isObjectId(boardId)) {
//     return fail("VALIDATION_ERROR", "Invalid boardId", 400);
//   }

//   if (!name) {
//     return fail("VALIDATION_ERROR", "Column name is required", 400);
//   }

//   await connectDB();

//   const board = await Board.findOne({ _id: boardId, userId });
//   if (!board) {
//     return fail("NOT_FOUND", "Board not found", 404);
//   }

//   const columns = await Column.find({ boardId }).sort({ order: 1 }).lean();
//   const rawOrder =
//     typeof incomingOrder === "number" && Number.isInteger(incomingOrder)
//       ? incomingOrder
//       : columns.length;
//   const insertIndex = clampIndex(rawOrder, 0, columns.length);

//   const column = await Column.create({
//     boardId,
//     name,
//     order: insertIndex,
//     jobApplications: [],
//   });

//   const orderedColumnIds = normalizeIds(columns.map((item) => item._id));
//   orderedColumnIds.splice(insertIndex, 0, column._id.toString());

//   await Board.updateOne({ _id: boardId }, { columns: orderedColumnIds });
//   await Promise.all(
//     orderedColumnIds.map((id, index) =>
//       Column.updateOne({ _id: id }, { order: index })
//     )
//   );

//   return ok({ column }, 201);
// }
