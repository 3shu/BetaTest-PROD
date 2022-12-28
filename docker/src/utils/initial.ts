
import { AppDataSource } from "../datasource/db";
import { User } from "../entities/User";
import logger from "../utils/logger";

const userRepository = AppDataSource.getRepository(User);

export const initial = async () => {
    let userVerify = await userRepository.findOneBy({username:'admin'});
    if (!userVerify) {
        try {
            const user = new User();
            user.username = 'admin';
            user.password = 'admin';
            user.role = 'ADMIN';
            //Hash the password, to securely store on DB
            user.hashPassword();
            try {
            await userRepository.save(user);
            } catch (e) {
            logger.error(e);
            return;
            }
            logger.info("User created username: admin <--> password: admin");
        } catch (error) {
            logger.error(error);
        }       
    } else {
        logger.info("User (admin) was created");
    }    
  };
  