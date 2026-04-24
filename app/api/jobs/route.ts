// import connectDB from "@/lib/db";
// import { Board, Column, JobApplication } from "@/lib/models";
// import {
//   ALLOWED_STATUSES,
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
//   const columnId = body.columnId;
//   const company = typeof body.company === "string" ? body.company.trim() : "";
//   const position = typeof body.position === "string" ? body.position.trim() : "";
//   const location = typeof body.location === "string" ? body.location.trim() : "";
//   const notes = typeof body.notes === "string" ? body.notes : undefined;
//   const salary = typeof body.salary === "string" ? body.salary : undefined;
//   const jobUrl = typeof body.jobUrl === "string" ? body.jobUrl : undefined;
//   const description = typeof body.description === "string" ? body.description : undefined;
//   const status =
//     typeof body.status === "string" && ALLOWED_STATUSES.has(body.status)
//       ? body.status
//       : "applied";
//   const tags = Array.isArray(body.tags)
//     ? body.tags.filter((tag): tag is string => typeof tag === "string")
//     : [];

//   if (!isObjectId(boardId) || !isObjectId(columnId)) {
//     return fail("VALIDATION_ERROR", "Invalid boardId or columnId", 400);
//   }

//   if (!company || !position) {
//     return fail("VALIDATION_ERROR", "company and position are required", 400);
//   }

//   await connectDB();

//   const board = await Board.findOne({ _id: boardId, userId }).lean();
//   if (!board) {
//     return fail("NOT_FOUND", "Board not found", 404);
//   }

//   const column = await Column.findOne({ _id: columnId, boardId }).lean();
//   if (!column) {
//     return fail("NOT_FOUND", "Column not found", 404);
//   }

//   const currentJobIds = normalizeIds(column.jobApplications);
//   const requestedOrder =
//     typeof body.order === "number" && Number.isInteger(body.order)
//       ? body.order
//       : currentJobIds.length;
//   const insertIndex = clampIndex(requestedOrder, 0, currentJobIds.length);

//   const job = await JobApplication.create({
//     boardId,
//     columnId,
//     userId,
//     company,
//     position,
//     location,
//     status,
//     notes,
//     salary,
//     jobUrl,
//     description,
//     tags,
//     order: insertIndex,
//   });

//   currentJobIds.splice(insertIndex, 0, job._id.toString());

//   await Column.updateOne({ _id: columnId }, { jobApplications: currentJobIds });
//   await Promise.all(
//     currentJobIds.map((id, index) =>
//       JobApplication.updateOne({ _id: id }, { order: index, columnId })
//     )
//   );

//   return ok({ job }, 201);
// }
