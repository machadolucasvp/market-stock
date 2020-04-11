import User from '../models/User';

export default async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({
      error: { message: "Can't find requested user, maybe doesn't exists" },
    });
  }
  return next();
};
