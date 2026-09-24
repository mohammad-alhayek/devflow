import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(2, "Task title must be at least 2 characters")
    .max(150, "Task title must be less than 150 characters"),

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).default("TODO"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),

  dueDate: z.string().datetime().optional().nullable(),

  assigneeId: z.number().int().positive().optional().nullable(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(2, "Task title must be at least 2 characters")
    .max(150, "Task title must be less than 150 characters")
    .optional(),

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "DONE"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),

  dueDate: z.string().datetime().optional().nullable(),

  assigneeId: z.number().int().positive().optional().nullable(),
});
