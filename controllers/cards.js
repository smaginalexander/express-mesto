const Card = require('../models/card');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../errors/errorNames');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err));
};
const createCard = (req, res) => Card.countDocuments()
  .then((count) => Card.create({ id: count, ...req.body })
    .then((card) => res.status(OK).send(card))
    .catch((err) => res.status(BAD_REQUEST).send({ message: err.message })));

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send(err));
};

module.exports = { getCards, createCard, deleteCard };
