
const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Plase login to access this page');
        return res.redirect('/login');
    }
};

module.exports = isAuthenticated;