import connectDB from "@/lib/db";
import { Board, Column } from "@/lib/models";
import {
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

  const boardId = body.boardId;
  const orderedColumnIds = body.orderedColumnIds;

  if (!isObjectId(boardId)) {
    return fail("VALIDATION_ERROR", "Invalid boardId", 400);
  }

  if (!Array.isArray(orderedColumnIds) || orderedColumnIds.some((id) => !isObjectId(id))) {
    return fail("VALIDATION_ERROR", "orderedColumnIds must be an array of valid IDs", 400);
  }

  await connectDB();

  const board = await Board.findOne({ _id: boardId, userId }).lean();
  if (!board) {
    return fail("NOT_FOUND", "Board not found", 404);
  }

  const currentIds = normalizeIds(board.columns);
  const incomingIds = normalizeIds(orderedColumnIds);

  if (
    currentIds.length !== incomingIds.length ||
    [...currentIds].sort().join(",") !== [...incomingIds].sort().join(",")
  ) {
    return fail("VALIDATION_ERROR", "orderedColumnIds does not match current board columns", 400);
  }

  await Board.updateOne({ _id: boardId }, { columns: incomingIds });
  await Promise.all(
    incomingIds.map((id, index) => Column.updateOne({ _id: id }, { order: index }))
  );

  return ok({ updated: true });
}
