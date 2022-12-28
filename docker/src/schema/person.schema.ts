/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePersonInput:
 *      type: object
 *      required:
 *        - email
 *        - firstName
 *      properties:
 *        email:
 *          type: string
 *          default: mario@mail.com
 *        firstName:
 *          type: string
 *          default: Mario
 *        lastName:
 *          type: string
 *          default: Perez
 *    CreatePersonResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        FirstName:
 *          type: string
 *        LastName:
 *          type: string
 *        _id:
 *          type: string
 *        assests:
 *          type: object 
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UpdatePersonInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *      properties:
 *        firstName:
 *          type: string
 *          default: Mario
 *        lastName:
 *          type: string
 *          default: Perez
 */
