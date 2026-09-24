/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a project
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to access this project's tasks
 *       404:
 *         description: Project not found
 *
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task data
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to create tasks in this project
 *       404:
 *         description: Project or assignee not found
 */

/**
 * @swagger
 * /api/projects/{id}/tasks/{taskId}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid task data or task does not belong to this project
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to modify this task
 *       404:
 *         description: Task or assignee not found
 *
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task or project ID
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to delete this task
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /api/my-tasks/projects:
 *   get:
 *     summary: Get projects containing tasks assigned to the current user
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Projects with tasks assigned to the current user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MyTaskProject'
 *       401:
 *         description: User is not authenticated
 *       500:
 *         description: Failed to fetch user's task projects
 */

/**
 * @swagger
 * /api/my-tasks/projects/{id}:
 *   get:
 *     summary: Get all tasks for a project assigned to the current user
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: All tasks in the project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User does not have any task assigned in this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to fetch project tasks
 */

/**
 * @swagger
 * /api/my-tasks/projects/{id}/tasks/{taskId}/status:
 *   patch:
 *     summary: Update the status of a task assigned to the current user
 *     tags: [Tasks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *           example: 5
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMyTaskStatus'
 *     responses:
 *       200:
 *         description: Task status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task status updated successfully
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid project ID, task ID, status, or task does not belong to this project
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to change this task's status
 *       404:
 *         description: Task not found
 *       500:
 *         description: Failed to update task status
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 5
 *         title:
 *           type: string
 *           example: Implement authentication API
 *         description:
 *           type: string
 *           nullable: true
 *           example: Implement login and registration endpoints
 *         status:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - DONE
 *           example: IN_PROGRESS
 *         priority:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - CRITICAL
 *           example: HIGH
 *         dueDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2026-09-30T18:00:00.000Z
 *         projectId:
 *           type: integer
 *           example: 1
 *         assigneeId:
 *           type: integer
 *           nullable: true
 *           example: 2
 *         assignee:
 *           $ref: '#/components/schemas/TaskAssignee'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-09-24T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-09-24T13:00:00.000Z
 *
 *     TaskAssignee:
 *       type: object
 *       nullable: true
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         name:
 *           type: string
 *           example: Ahmad
 *         email:
 *           type: string
 *           format: email
 *           example: ahmad@example.com
 *         role:
 *           type: string
 *           enum:
 *             - ADMIN
 *             - PROJECT_MANAGER
 *             - DEVELOPER
 *           example: DEVELOPER
 *
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: Implement authentication API
 *         description:
 *           type: string
 *           maxLength: 1000
 *           example: Implement login and registration endpoints
 *         status:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - DONE
 *           default: TODO
 *           example: TODO
 *         priority:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - CRITICAL
 *           default: MEDIUM
 *           example: HIGH
 *         dueDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2026-09-30T18:00:00.000Z
 *         assigneeId:
 *           type: integer
 *           nullable: true
 *           example: 2
 *
 *     UpdateTask:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 150
 *           example: Implement authentication API
 *         description:
 *           type: string
 *           maxLength: 1000
 *           example: Updated task description
 *         status:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - DONE
 *           example: DONE
 *         priority:
 *           type: string
 *           enum:
 *             - LOW
 *             - MEDIUM
 *             - HIGH
 *             - CRITICAL
 *           example: CRITICAL
 *         dueDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: 2026-09-30T18:00:00.000Z
 *         assigneeId:
 *           type: integer
 *           nullable: true
 *           example: 2
 *
 *     UpdateMyTaskStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - TODO
 *             - IN_PROGRESS
 *             - REVIEW
 *             - DONE
 *           example: IN_PROGRESS
 *
 *     MyTaskProject:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: DevFlow
 *         description:
 *           type: string
 *           nullable: true
 *           example: Project management system
 *         myTaskCount:
 *           type: integer
 *           example: 3
 *           description: Number of tasks assigned to the current user
 *         totalTaskCount:
 *           type: integer
 *           example: 8
 *           description: Total number of tasks in the project
 */
