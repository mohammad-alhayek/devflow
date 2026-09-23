import { registerSchema } from "../../../../validators/auth.validator";
import { registerUser } from "../../../../services/auth.service";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: result.error.issues,
        },
        { status: 400 },
      );
    }

    const user = await registerUser(result.data);

    return Response.json(
      {
        message: "User registered successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 },
    );
  }
}
