import models from '../models';

export default async function (value) {
  const users = (await models.user.findAll({ attributes: ['username'] })).map(user => user.username);
  return users.includes(value);
}
