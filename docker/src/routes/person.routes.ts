import { Router } from "express";
import PersonController from "../controllers/person.controllers";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
const router = Router();

// router.get("/all", PersonController.getPersons);
/**
 * @openapi
 * '/api/person/all':
 *  get:
 *     tags:
 *     - Person
 *     summary: get all persons
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePersonResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/all", [checkJwt, checkRole(["ADMIN"])], PersonController.getPersons);
/**
 * @openapi
 * '/api/person/{personId}':
 *  get:
 *     tags:
 *     - Person
 *     summary: get a person
 *     parameters:
 *      - name: personId
 *        in: path
 *        description: The id of the person
 *        required: true
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePersonResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], PersonController.getPerson);
/**
 * @openapi
 * '/api/persons':
 *  post:
 *     tags:
 *     - Person
 *     summary: create a person
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreatePersonInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreatePersonResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
// router.post("/", PersonController.createPerson);
router.post("/", [checkJwt, checkRole(["ADMIN"])], PersonController.createPerson);
/**
 * @openapi
 * '/api/person/{personId}':
 *  put:
 *     tags:
 *     - Person
 *     summary: update a person
 *     parameters:
 *      - name: personId
 *        in: path
 *        description: The id of the person
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdatePersonInput'
 *     responses:
 *      204:
 *        description: No Content Found (success)
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], PersonController.updatePerson);
/**
 * @openapi
 * '/api/person/{personId}':
 *  delete:
 *     tags:
 *     - Person
 *     summary: delete a person
 *     parameters:
 *      - name: personId
 *        in: path
 *        description: The id of the person
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
router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], PersonController.deletePerson);

export default router;