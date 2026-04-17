import connectDB from "@/lib/db";
import { Board, Column, JobApplication } from "@/lib/models";
import {
  clampIndex,
  fail,
  isObjectId,
  normalizeIds,
  ok,
  parseJsonBody,
  requireUserId,
} from "@/lib/api/http";

export async function POST(request: Request) {
  const { userId, response } = await requireUserId();
  if (response || !userId) {
    return response;
  }

  const body = await parseJsonBody(request);
  if (!body) {
    return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
  }

  const jobId = body.jobId;
  const fromColumnId = body.fromColumnId;
  const toColumnId = body.toColumnId;
  const toIndex = body.toIndex;

  if (
    !isObjectId(jobId) ||
    !isObjectId(fromColumnId) ||
    !isObjectId(toColumnId) ||
    typeof toIndex !== "number" ||
    !Number.isInteger(toIndex)
  ) {
    return fail("VALIDATION_ERROR", "Invalid reorder payload", 400);
  }

  await connectDB();

  const job = await JobApplication.findOne({ _id: jobId, userId }).lean();
  if (!job) {
    return fail("NOT_FOUND", "Job not found", 404);
  }

  if (job.columnId.toString() !== fromColumnId) {
    return fail("CONFLICT", "fromColumnId does not match current job column", 409);
  }

  const board = await Board.findOne({ _id: job.boardId, userId }).lean();
  if (!board) {
    return fail("NOT_FOUND", "Board not found", 404);
  }

  const [sourceColumn, targetColumn] = await Promise.all([
    Column.findOne({ _id: fromColumnId, boardId: board._id }).lean(),
    Column.findOne({ _id: toColumnId, boardId: board._id }).lean(),
  ]);

  if (!sourceColumn || !targetColumn) {
    return fail("NOT_FOUND", "Column not found", 404);
  }

  const sourceIds = normalizeIds(sourceColumn.jobApplications).filter((id) => id !== jobId);
  const targetIds =
    fromColumnId === toColumnId
      ? sourceIds
      : normalizeIds(targetColumn.jobApplications).filter((id) => id !== jobId);

  const insertIndex = clampIndex(toIndex, 0, targetIds.length);
  targetIds.splice(insertIndex, 0, jobId);

  if (fromColumnId === toColumnId) {
    await Column.updateOne({ _id: sourceColumn._id }, { jobApplications: targetIds });
    await Promise.all(
      targetIds.map((id, index) =>
        JobApplication.updateOne(
          { _id: id },
          { order: index, columnId: sourceColumn._id, boardId: board._id }
        )
      )
    );
  } else {
    await Promise.all([
      Column.updateOne({ _id: sourceColumn._id }, { jobApplications: sourceIds }),
      Column.updateOne({ _id: targetColumn._id }, { jobApplications: targetIds }),
    ]);

    await Promise.all([
      ...sourceIds.map((id, index) =>
        JobApplication.updateOne(
          { _id: id },
          { order: index, columnId: sourceColumn._id, boardId: board._id }
        )
      ),
      ...targetIds.map((id, index) =>
        JobApplication.updateOne(
          { _id: id },
          { order: index, columnId: targetColumn._id, boardId: board._id }
        )
      ),
    ]);
  }

  const updatedJob = await JobApplication.findById(jobId).lean();
  return ok({ job: updatedJob, reordered: true });
}
