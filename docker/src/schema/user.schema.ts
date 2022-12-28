/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - role
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: admin
 *        password:
 *          type: string
 *          default: admin
 *        role:
 *          type: string
 *          default: ADMIN
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        role:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UpdateUserInput:
 *      type: object
 *      required:
 *        - username
 *        - role
 *      properties:
 *        username:
 *          type: string
 *          default: admin
 *        role:
 *          type: string
 *          default: ADMIN
 */
