import Client from '../models/User';

export default async (req, res, next) => {
  const client = await Client.findByPk(req.params.id);
  if (!client) {
    return res.status(404).json({
      error: { message: "Can't find requested client, maybe doesn't exists" },
    });
  }
  return next();
};
