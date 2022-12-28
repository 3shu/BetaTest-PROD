import pino from "pino";
import dayjs from "dayjs";

const log = pino({
    transport: {
      target: 'pino-pretty',
      time: () => `,"time":"${dayjs().format()}"`,
      options: {
        colorize: true,
      }
    }
  });

export default log;
