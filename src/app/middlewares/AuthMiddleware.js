import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      error: { message: 'Token not provided' },
    });
  }
  const [, parsedToken] = authHeader.split(' ');

  const verifyToken = (tokenValue, secret) => {
    return new Promise((resolve, reject) => {
      jwt.verify(tokenValue, secret, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  };

  return verifyToken(parsedToken, process.env.JWET_KEY)
    .then((result) => {
      req.userId = result.id;
      return next();
    })
    .catch(() => {
      return res.status(401).json({ error: 'Token invalid' });
    });
};
