import { checkSchema, validationResult } from 'express-validator';
import { hashSync } from 'bcrypt';
import exist from '../check';

export const check = checkSchema({
  name: {
    isString: true,
  },
  email: {
    isString: true,
    custom: {
      options: value => value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    },
  },
  password: {
    isString: true,
  },
  username: {
    isString: true,
    custom: {
      options: value => exist(value),
    },
  },
});

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    req.user = {
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hashSync(req.body.password, 10),
    };
    next();
  }
}
