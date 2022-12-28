import app from "./app";
import { APP_PORT } from "./config/config";
import logger from "./utils/logger";
import { AppDataSource } from "./datasource/db";
import { initial } from './utils/initial'
import swaggerDocs from './utils/swagger'

async function main() {
  try {
    await AppDataSource.initialize();
    await initial();
    app.listen(APP_PORT);
    logger.info(`Server on port ${APP_PORT}`);
    swaggerDocs(app,APP_PORT);
  } catch (error) {
    logger.error(error);
  }
}

main();