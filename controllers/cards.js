const path = require('path');
const getDataFromFile = require('../helpers/files.js');
const dataPathCards = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
    return getDataFromFile(dataPathCards)
        .then(cards => res.status(200).send(cards))
        .catch(err => res.status(500).send(err))
}

module.exports = getCards;