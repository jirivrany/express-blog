module.exports = {

    /*
    * Pokud neni v session userId uživatel je přesměrován na přihlašovací formulář
    */
    requiresLogin: function (req, res, next) {
      if (req.session && req.session.userId) {
        return next();
      } else {
        return res.redirect('/login');
      }
    }
}