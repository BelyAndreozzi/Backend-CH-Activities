import express from 'express'
import passport from 'passport';

const router = express.Router();

//SIGN UP
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate("signupStrategy", {
    failureRedirect: "/failSignup",
    failureMessage: true,

}), (req, res) => {
    console.log(req.session.passport.username)
    res.redirect("/")
})

router.get('/failSignup', (req, res) => {
    res.render('failSignup')
})


//LOGIN 
router.get('/login', (req, res) => {
    res.render('login')
})


router.post('/login', passport.authenticate("loginStrategy", {
    failureRedirect: "/login",
    failureMessage: true,

}), (req, res) => {
    const { email } = req.body
    req.session.passport.username = email
    res.redirect("/")
})

router.get('/failLogin', (req, res) => {
    res.render('failLogin')
})


//LOG OUT 
router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/')
        res.render("logout")
    })
})

export {router as authRouter}