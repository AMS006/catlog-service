import app from "./app";
import { initDB } from "./config/db";
import logger from "./config/logger";
import config from "config";

const startServer = async () => {
    const PORT: number = config.get("server.port") || 5502;

    try {
        app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}`)
        });
        await initDB();
        logger.info("Database connected");
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

void startServer();
