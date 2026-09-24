/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management endpoints
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get current user's projects
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       401:
 *         description: User is not authenticated
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProject'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Project created successfully
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: User is not authenticated
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
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
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to access this project
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
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
 *             $ref: '#/components/schemas/UpdateProject'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to modify this project
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
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
 *         description: Project deleted successfully
 *       400:
 *         description: Invalid project ID
 *       401:
 *         description: User is not authenticated
 *       403:
 *         description: User is not allowed to delete this project
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
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
 *           example: Project management platform for development teams
 *         ownerId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-09-24T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-09-24T12:30:00.000Z
 *
 *     CreateProject:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: DevFlow
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Project management platform for development teams
 *
 *     UpdateProject:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: DevFlow Platform
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Updated project description
 */
