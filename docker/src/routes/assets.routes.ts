import { Router } from "express";
import AssetsController from "../controllers/asset.controllers";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";
const router = Router();

// router.get("/all", AssetsController.getAssets);
/**
 * @openapi
 * '/api/asset/all':
 *  get:
 *     tags:
 *     - Asset
 *     summary: get all assets
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAssetResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/all", [checkJwt, checkRole(["ADMIN"])], AssetsController.getAssets);
/**
 * @openapi
 * '/api/asset/{assetId}':
 *  get:
 *     tags:
 *     - Asset
 *     summary: get a asset
 *     parameters:
 *      - name: assetId
 *        in: path
 *        description: The id of the asset
 *        required: true
 *     requestBody:
 *      required: false
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAssetResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], AssetsController.getAsset);
/**
 * @openapi
 * '/api/assets':
 *  post:
 *     tags:
 *     - Asset
 *     summary: create a asset
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateAssetInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateAssetResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
// router.post("/", AssetsController.createAsset);
router.post("/", [checkJwt, checkRole(["ADMIN"])], AssetsController.createAssets);
/**
 * @openapi
 * '/api/asset/{assetId}':
 *  put:
 *     tags:
 *     - Asset
 *     summary: update a asset
 *     parameters:
 *      - name: assetId
 *        in: path
 *        description: The id of the asset
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateAssetInput'
 *     responses:
 *      204:
 *        description: No Content Found (success)
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], AssetsController.updateAssets);
/**
 * @openapi
 * '/api/asset/{assetId}':
 *  delete:
 *     tags:
 *     - Asset
 *     summary: delete a asset
 *     parameters:
 *      - name: assetId
 *        in: path
 *        description: The id of the asset
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
router.delete("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], AssetsController.deleteAssets);

export default router;