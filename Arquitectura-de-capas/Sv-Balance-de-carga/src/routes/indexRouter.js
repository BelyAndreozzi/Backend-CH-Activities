import express from "express";
import { authRouter } from "./api/auth.routes.js";
import { infoRouter } from "./api/info.routes.js";
import { randomsRouter } from "./api/randoms.routes.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.render('form')
})

router.use('/auth', authRouter);
router.use('/info', infoRouter);
router.use('/random', randomsRouter)

export {router as indexRouter}