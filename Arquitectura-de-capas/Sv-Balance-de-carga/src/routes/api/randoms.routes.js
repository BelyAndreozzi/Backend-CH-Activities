import express from 'express';

const router = express.Router();

router.get('/api/randoms', (req, res) => {
    const child = fork('./src/childProcess/randomNumChild.js')
    const cantNum = req.query.cantNum || 100000000
    child.on('message', (childMsg) => {
        if (childMsg == 'Listo') {
            child.send('Iniciar ' + cantNum)
        } else {
            res.render('numerosRandom', { childMsg: JSON.stringify(childMsg) })
        }
    })
})

export { router as randomsRouter }