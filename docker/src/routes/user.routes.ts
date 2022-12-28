import { Router } from "express";
import UserController from "../controllers/user.controllers";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
const router = Router();

// router.get("/all", UserController.getUsers);
/**
 * @openapi
 * '/api/users/all':
 *  get:
 *     tags:
 *     - User
 *     summary: get all users
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/all", [checkJwt, checkRole(["ADMIN"])], UserController.getUsers);
/**
 * @openapi
 * '/api/users/{userId}':
 *  get:
 *     tags:
 *     - User
 *     summary: get a user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.getUser);
/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
// router.post("/", UserController.createUser);
router.post("/", [checkJwt, checkRole(["ADMIN"])], UserController.createUser);
/**
 * @openapi
 * '/api/users/{userId}':
 *  put:
 *     tags:
 *     - User
 *     summary: update a user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *      204:
 *        description: No Content Found (success)
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.updateUser);
/**
 * @openapi
 * '/api/users/{userId}':
 *  delete:
 *     tags:
 *     - User
 *     summary: delete a user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The id of the user
 *        required: true
 *     requestBody:
 *      required: false
 *     responses:
 *      204:
 *        description: No Content Found (success)
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], UserController.deleteUser);

export default router;