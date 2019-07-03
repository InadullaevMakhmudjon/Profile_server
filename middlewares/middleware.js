import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(' ')[1];
    if (token) {
      verify(token, process.env.SIGN_IN_KEY, (err, decoded) => {
        if (err) res.send(401);
        req.userId = decoded.userId;
        console.log(`${decoded.userId}`);
        next();
      });
    } else {
      res.send(401);
    }
  } else {
    res.send(401);
  }
};
