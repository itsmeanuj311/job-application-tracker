// import connectDB from "@/lib/db";
// import { Column, JobApplication } from "@/lib/models";
// import {
//   ALLOWED_STATUSES,
//   fail,
//   isObjectId,
//   normalizeIds,
//   ok,
//   parseJsonBody,
//   requireUserId,
// } from "@/lib/api/http";

// interface Params {
//   params: Promise<{ jobId: string }>;
// }

// export async function PATCH(request: Request, { params }: Params) {
//   const { userId, response } = await requireUserId();
//   if (response || !userId) {
//     return response;
//   }

//   const { jobId } = await params;
//   if (!isObjectId(jobId)) {
//     return fail("VALIDATION_ERROR", "Invalid jobId", 400);
//   }

//   const body = await parseJsonBody(request);
//   if (!body) {
//     return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
//   }

//   const updates: Record<string, unknown> = {};

//   if (typeof body.company === "string") {
//     const company = body.company.trim();
//     if (!company) {
//       return fail("VALIDATION_ERROR", "company cannot be empty", 400);
//     }
//     updates.company = company;
//   }

//   if (typeof body.position === "string") {
//     const position = body.position.trim();
//     if (!position) {
//       return fail("VALIDATION_ERROR", "position cannot be empty", 400);
//     }
//     updates.position = position;
//   }

//   if (typeof body.location === "string") updates.location = body.location.trim();
//   if (typeof body.notes === "string") updates.notes = body.notes;
//   if (typeof body.salary === "string") updates.salary = body.salary;
//   if (typeof body.jobUrl === "string") updates.jobUrl = body.jobUrl;
//   if (typeof body.description === "string") updates.description = body.description;
//   if (Array.isArray(body.tags)) {
//     updates.tags = body.tags.filter((tag): tag is string => typeof tag === "string");
//   }
//   if (
//     typeof body.status === "string" &&
//     ALLOWED_STATUSES.has(body.status)
//   ) {
//     updates.status = body.status;
//   }

//   await connectDB();

//   const job = await JobApplication.findOneAndUpdate(
//     { _id: jobId, userId },
//     updates,
//     { new: true }
//   ).lean();

//   if (!job) {
//     return fail("NOT_FOUND", "Job not found", 404);
//   }

//   return ok({ job });
// }

// export async function DELETE(_request: Request, { params }: Params) {
//   const { userId, response } = await requireUserId();
//   if (response || !userId) {
//     return response;
//   }

//   const { jobId } = await params;
//   if (!isObjectId(jobId)) {
//     return fail("VALIDATION_ERROR", "Invalid jobId", 400);
//   }

//   await connectDB();

//   const job = await JobApplication.findOne({ _id: jobId, userId }).lean();
//   if (!job) {
//     return fail("NOT_FOUND", "Job not found", 404);
//   }

//   await JobApplication.deleteOne({ _id: jobId, userId });

//   const column = await Column.findById(job.columnId).lean();
//   if (column) {
//     const remainingJobIds = normalizeIds(column.jobApplications).filter((id) => id !== jobId);
//     await Column.updateOne({ _id: column._id }, { jobApplications: remainingJobIds });
//     await Promise.all(
//       remainingJobIds.map((id, index) => JobApplication.updateOne({ _id: id }, { order: index }))
//     );
//   }

//   return ok({ deleted: true, id: jobId });
// }
