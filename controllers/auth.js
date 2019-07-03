import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import models from '../models';

function getUser(where, res, next) {
  models.user.findAll({ where })
    .then(users => (users.length ? next(users) : res.send(403)))
    .catch(err => res.send(err));
}

export default {
  about(req, res) {
    getUser({ id: req.userId }, res, users => res.status(200).json(users));
  },
  login(req, res) {
    getUser({ username: req.body.username }, res, ([user]) => {
      if (compareSync(req.body.password, user.password)) {
        sign({ userId: user.id }, process.env.SIGN_IN_KEY, { }, (err, token) => {
          if (err) { res.send(501); } else { res.status(200).json({ token }); }
        });
      } else res.send(401);
    });
  },
  register(req, res) {
    models.user.create(req.user)
      .then(user => res.status(201).json({ user }))
      .catch(() => res.send(501));
  },
};
