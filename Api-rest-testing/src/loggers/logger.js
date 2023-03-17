import log4js  from "log4js";

log4js.configure({
    appenders: {
        console: { type: "console" },
        errorFile: { type: "file", filename: "./src/logs/errors.log" },
        consoleLogger: { type: "logLevelFilter", appender: "console", level: "info" },
        errorLogger: { type: "logLevelFilter", appender: "errorFile", level: "error" },
    },
    categories: {
        default: { appenders: ["consoleLogger", "errorLogger"], level: "all" },
    },
})

export const logger = log4js.getLogger();