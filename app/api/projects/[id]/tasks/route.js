import { NextResponse } from "next/server";

import { authMiddleware } from "../../../../../middlewares/auth.middleware";
import {
  createNewTask,
  getProjectTasks,
} from "../../../../../services/task.service";
import { createTaskSchema } from "../../../../../validators/task.validator";

export async function GET(request, { params }) {
  const session = await authMiddleware();

  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const tasks = await getProjectTasks(projectId, Number(session.userId));

    return NextResponse.json({
      tasks,
    });
  } catch (error) {
    if (error.message === "Project not found") {
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
        error: "Failed to fetch tasks",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request, { params }) {
  const session = await authMiddleware();

  const { id } = await params;
  const projectId = Number(id);

  if (Number.isNaN(projectId)) {
    return NextResponse.json(
      {
        error: "Invalid project ID",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const body = await request.json();

    const validatedData = createTaskSchema.parse(body);

    const task = await createNewTask(
      {
        ...validatedData,
        projectId,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      },
      Number(session.userId),
    );

    return NextResponse.json(
      {
        message: "Task created successfully",
        task,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("================================");
    console.error("CREATE TASK ERROR");
    console.error("name:", error?.name);
    console.error("message:", error?.message);
    console.error("code:", error?.code);
    console.error("meta:", error?.meta);
    console.error("stack:", error?.stack);
    console.error("================================");

    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: error.issues[0]?.message || "Invalid task data",
        },
        { status: 400 },
      );
    }

    if (error.message === "Project not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error.message === "Assignee not found") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error.message === "Tasks can only be assigned to developers") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error.message?.startsWith("You are not allowed")) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
