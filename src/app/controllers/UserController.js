import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { id, name, email, status } = await User.create(req.body);

      return res.status(200).json({
        id,
        name,
        email,
        status,
      });
    } catch (err) {
      return res.status(400).send();
    }
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password not match!' });
    }

    const { id, name, email } = await user.update(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: { message: "Can't find requested user, maybe doesn't exists" },
      });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    await user.destroy();

    return res.status(204).send();
  }
}

export default new UserController();
