import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../../../middlewares/auth.middleware";
import { editTask, removeTask } from "../../../../../../services/task.service";
import { updateTaskSchema } from "../../../../../../validators/task.validator";

export async function PUT(request, { params }) {
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

    const validatedData = updateTaskSchema.parse(body);

    const task = await editTask(taskIdNumber, Number(session.userId), {
      ...validatedData,
      dueDate: validatedData.dueDate
        ? new Date(validatedData.dueDate)
        : validatedData.dueDate,
    });

    if (task.projectId !== projectId) {
      return NextResponse.json(
        {
          error: "Task does not belong to this project",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: error.issues[0]?.message || "Invalid task data",
        },
        {
          status: 400,
        },
      );
    }

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

    if (error.message === "Assignee not found") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 404,
        },
      );
    }

    if (error.message === "Tasks can only be assigned to developers") {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        },
      );
    }

    if (error.message.startsWith("You are not allowed")) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update task",
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request, { params }) {
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
    const task = await removeTask(taskIdNumber, Number(session.userId));

    if (task.projectId !== projectId) {
      return NextResponse.json(
        {
          error: "Task does not belong to this project",
        },
        {
          status: 400,
        },
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
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

    if (error.message.startsWith("You are not allowed")) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 403,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Failed to delete task",
      },
      {
        status: 500,
      },
    );
  }
}
