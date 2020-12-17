const path = require('path');
const getDataFromFile = require('../helpers/files.js');
const dataPathUsers = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
    return getDataFromFile(dataPathUsers)
        .then(users => res.status(200).send(users))
        .catch(err => res.status(500).send(err))
}

const getProfile = (req, res) => {
    return getDataFromFile(dataPathUsers)
        .then(users => users.find(user => user._id === req.params._id))
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Нет пользователя с таким id' })
            }
            return res.status(200).send(user);
        })
        .catch(err => res.status(500).send(err))
}

module.exports = { getUsers, getProfile }