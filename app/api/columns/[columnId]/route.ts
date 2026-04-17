import connectDB from "@/lib/db";
import { Board, Column } from "@/lib/models";
import {
  clampIndex,
  fail,
  isObjectId,
  normalizeIds,
  ok,
  parseJsonBody,
  requireUserId,
} from "@/lib/api/http";

interface Params {
  params: Promise<{ columnId: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  const { userId, response } = await requireUserId();
  if (response || !userId) {
    return response;
  }

  const { columnId } = await params;
  if (!isObjectId(columnId)) {
    return fail("VALIDATION_ERROR", "Invalid columnId", 400);
  }

  const body = await parseJsonBody(request);
  if (!body) {
    return fail("VALIDATION_ERROR", "Invalid JSON body", 400);
  }

  const nextName = typeof body.name === "string" ? body.name.trim() : undefined;
  const nextOrder =
    typeof body.order === "number" && Number.isInteger(body.order)
      ? body.order
      : undefined;

  await connectDB();

  const currentColumn = await Column.findById(columnId).lean();
  if (!currentColumn) {
    return fail("NOT_FOUND", "Column not found", 404);
  }

  const board = await Board.findOne({
    _id: currentColumn.boardId,
    userId,
  }).lean();

  if (!board) {
    return fail("NOT_FOUND", "Column not found", 404);
  }

  if (typeof nextName === "string") {
    if (!nextName) {
      return fail("VALIDATION_ERROR", "Column name cannot be empty", 400);
    }
    await Column.updateOne({ _id: columnId }, { name: nextName });
  }

  if (typeof nextOrder === "number") {
    const columns = await Column.find({ boardId: board._id }).sort({ order: 1 }).lean();
    const orderedIds = normalizeIds(columns.map((item) => item._id));
    const currentIndex = orderedIds.findIndex((id) => id === columnId);

    if (currentIndex !== -1) {
      orderedIds.splice(currentIndex, 1);
      const targetIndex = clampIndex(nextOrder, 0, orderedIds.length);
      orderedIds.splice(targetIndex, 0, columnId);

      await Board.updateOne({ _id: board._id }, { columns: orderedIds });
      await Promise.all(
        orderedIds.map((id, index) =>
          Column.updateOne({ _id: id }, { order: index })
        )
      );
    }
  }

  const column = await Column.findById(columnId).lean();
  return ok({ column });
}
