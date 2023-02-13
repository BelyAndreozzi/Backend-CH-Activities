import log4js from "log4js";
import { envConfig } from "../config/envConfig.js";

// configuracion de log4js 
log4js.configure({
    appenders:{
        consola:{type:"console"},
        errores:{type:"file", filename:"./src/logs/errores.log"},
        debug:{type:'file', filename:'./src/logs/debug.log'},
        consolaInfo:{type:'logLevelFilter', appender:'consola', level:'info'},
        consolaError:{type:'logLevelFilter', appender:'consola', level:'error'},
        archivoDebug:{type:'logLevelFilter', appender:'debug', level:'debug'},
        archivoErrores:{type:'logLevelFilter', appender:'errores', level:'error'},
    },
    categories:{
        default:{appenders:['consolaInfo'], level:'all'},
        prod:{appenders:['archivoDebug', 'archivoErrores'], level:'all'}
    }
})

let logger = null
if (envConfig.NODE_ENV === 'production') {
    logger = log4js.getLogger('prod')
} else {
    logger = log4js.getLogger()
}

export {logger}
