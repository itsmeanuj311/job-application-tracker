import connectDB from "./db";
import { Board, Column } from "./models";
import jobApplications from "./models/jobApplications";

const DEFAULT_COLUMNS = [
    {
        name: "Wish List",
        order: 0,
    },
    {
        name: "Applied",
        order: 1,
    },
    {
        name: "Interviewing",
        order: 2,
    },
    {
        name: "Offered",
        order: 3,
    },
    {
        name: "Rejected",
        order: 4,
    },

]

export async function initializeUserBoard(userId: string) {
    try {
        await connectDB();

        //Check if board already exits
        const existingBoard = await Board.findOne({ userId, name: "Job Hunt" });

        if (existingBoard) {
            return existingBoard;
        }

        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: []
        });

        //Create default columns
        const columns = await Promise.all(
            DEFAULT_COLUMNS.map((col) => Column.create({
                name: col.name,
                order: col.order,
                boardId: board._id,
                jobApplication: [],
            }))
        );
        
        //Update the board with the new column Ids
        board.columns = columns.map((col) => col._id);
        await board.save();

        return board;
    } catch (err) {
        throw err;
    }
}