import { authMiddleware } from "../../../../middlewares/auth.middleware";

export async function GET() {
  try {
    const user = await authMiddleware();

    return Response.json(
      {
        user,
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
