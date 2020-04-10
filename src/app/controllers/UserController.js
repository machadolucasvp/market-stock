import User from '../models/User';

class UserController {
  async store(req, res) {
    const { id, name, email, status } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
      status,
    });
  }

  async update(req, res) {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({
        error: { message: "Can't find requested user, maybe dosn't exists" },
      });
    }
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
        error: { message: "Can't find requested user, maybe dosn't exists" },
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
    if (!user) {
      return res.status(404).json({
        error: { message: "Can't find requested user, maybe dosn't exists" },
      });
    }
    await user.delete();

    return res.status(204);
  }
}

export default new UserController();
