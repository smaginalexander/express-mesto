const User = require('../models/user.js');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../errors/errorNames');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err));
};
// вывод пользователя по id
const getProfile = (req, res) => {
  const id = req.params._id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'некорректный id' });
    });
};

const createUser = (req, res) => User.countDocuments()
  .then((count) => User.create({ id: count, ...req.body })
    .then((user) => res.status(OK).send(user))
    .catch((err) => res.status(BAD_REQUEST).send({ message: err.message })));

module.exports = { getUsers, getProfile, createUser };
