import joi from 'joi';

// Middleware för att validera en användare
function validateUser(req, res, next) {
  const userSchema = joi.object({
    username: joi.string().alphanum().min(3).max(15).required(),
    password: joi.string().min(5).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

export { validateUser };
