import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../../../../../middlewares/auth.middleware";
import { updateMyTaskStatus } from "../../../../../../../../services/task.service";

const allowedStatuses = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

export async function PATCH(request, { params }) {
  const session = await authMiddleware();

  const { id, taskId } = await params;

  const projectId = Number(id);
  const taskIdNumber = Number(taskId);

  if (Number.isNaN(projectId) || Number.isNaN(taskIdNumber)) {
    return NextResponse.json(
      {
        error: "Invalid project or task ID",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const body = await request.json();

    const { status } = body;

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid task status",
        },
        {
          status: 400,
        },
      );
    }

    const task = await updateMyTaskStatus(
      projectId,
      taskIdNumber,
      Number(session.userId),
      status,
    );

    return NextResponse.json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    if (error.message === "Task not found") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 404,
        },
      );
    }

    if (error.message === "Task does not belong to this project") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    if (error.message === "You are not allowed to change this task's status") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 403,
        },
      );
    }

    console.error("UPDATE MY TASK STATUS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to update task status",
      },
      {
        status: 500,
      },
    );
  }
}
