import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: {
          message: "Can't find a user with this email, maybe doesn't exists",
        },
      });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: {
          message: 'Wrong password, please check again',
        },
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, process.env.JWT_KEY, {
        expiresIn: 3600,
      }),
    });
  }
}

export default new SessionController();
