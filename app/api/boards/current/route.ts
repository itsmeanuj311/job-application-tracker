// import connectDB from "@/lib/db";
// import { Board } from "@/lib/models";
// import { fail, ok, requireUserId } from "@/lib/api/http";

// export async function GET() {
//   const { userId, response } = await requireUserId();
//   if (response || !userId) {
//     return response;
//   }

//   await connectDB();

//   const board = await Board.findOne({ userId })
//     .sort({ createdAt: 1 })
//     .populate({
//       path: "columns",
//       options: { sort: { order: 1 } },
//       populate: {
//         path: "jobApplications",
//         options: { sort: { order: 1 } },
//       },
//     })
//     .lean();

//   if (!board) {
//     return fail("NOT_FOUND", "Board not found", 404);
//   }

//   return ok({ board });
// }
