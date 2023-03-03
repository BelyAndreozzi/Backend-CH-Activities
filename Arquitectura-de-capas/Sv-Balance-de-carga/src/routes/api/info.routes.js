import express from 'express'

const router = express.Router();

router.get("/info", (req, res) => {
    res.render('info', {
        argsEntrada: process.argv.slice(2),
        sistOperativo: process.platform,
        node: process.version,
        rss: process.memoryUsage.rss(),
        pathEjecucion: process.execPath,
        pid: process.pid,
        carpetaProyecto: process.cwd()
    })
})

export { router as infoRouter }