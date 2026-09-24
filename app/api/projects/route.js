import { authMiddleware } from "../../../middlewares/auth.middleware";

import { createProjectSchema } from "../../../validators/project.validator";

import {
  createNewProject,
  getUserProjects,
} from "../../../services/project.service";

export async function POST(request) {
  try {
    const user = await authMiddleware();

    const body = await request.json();

    const result = createProjectSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues,
        },
        { status: 400 },
      );
    }

    const project = await createNewProject(result.data, Number(user.userId));

    return Response.json(
      {
        message: "Project created successfully",
        project,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 401 },
    );
  }
}

export async function GET() {
  try {
    const user = await authMiddleware();

    const projects = await getUserProjects(Number(user.userId));

    return Response.json(
      {
        projects,
      },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 401 },
    );
  }
}
