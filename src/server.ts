import app from "./app";
import logger from "./config/logger";
import config from "config";

const startServer = () => {
    const PORT: number = config.get("port") || 5502;
    const host: string = config.get("host") || "localhost";
    try {
        app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}`)
            logger.info(`http://${host}:${PORT}`);
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message);
            logger.on("finish", () => {
                process.exit(1);
            });
        }
    }
};

startServer();
