import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "DevFlow API",
      version: "1.0.0",
      description:
        "API documentation for the DevFlow project management platform.",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Projects",
        description: "Project management endpoints",
      },
      {
        name: "Tasks",
        description: "Task management endpoints",
      },
    ],

    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "session",
          description:
            "JWT session cookie used to authenticate protected endpoints.",
        },
      },
    },
  },

  apis: [
    "./swagger/auth.swagger.js",
    "./swagger/project.swagger.js",
    "./swagger/task.swagger.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
