import { authMiddleware } from "../../../../middlewares/auth.middleware";

import { updateProjectSchema } from "../../../../validators/project.validator";

import {
  getProject,
  editProject,
  removeProject,
} from "../../../../services/project.service";

export async function GET(request, { params }) {
  try {
    const user = await authMiddleware();

    const { id } = await params;

    const project = await getProject(Number(id), Number(user.userId));

    return Response.json(
      {
        project,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 404 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await authMiddleware();

    const { id } = await params;

    const body = await request.json();

    const result = updateProjectSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues,
        },
        { status: 400 },
      );
    }

    const project = await editProject(
      Number(id),
      Number(user.userId),
      result.data,
    );

    return Response.json(
      {
        message: "Project updated successfully",
        project,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 404 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await authMiddleware();

    const { id } = await params;

    await removeProject(Number(id), Number(user.userId));

    return Response.json(
      {
        message: "Project deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 404 },
    );
  }
}
