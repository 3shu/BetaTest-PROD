/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: admin
 *        password:
 *          type: string
 *          default: admin
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 */
