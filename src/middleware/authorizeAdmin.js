// Middleware för att validera en användare
function authorizeAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Accsess denied.' });
  }
  if (req.user.isAdmin !== true) {
    console.log(req.user);
    return res.status(403).json({ error: 'Accsess denied.' });
  }
  next();
}
export { authorizeAdmin };
