/**
 * @openapi
 * components:
 *  schemas:
 *    CreateAssetInput:
 *      type: object
 *      required:
 *        - title
 *        - personId
 *      properties:
 *        title:
 *          type: string
 *          default: Apartamento
 *        description:
 *          type: string
 *          default: Apartamento nuevo
 *        personId:
 *          type: number
 *          default: 1   
 *    CreateAssetResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        Description:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 *    UpdateAssetInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Bodega
 *        description:
 *          type: string
 *          default: Bodega para guardar articulos varios
 */
