const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
app.use((req, res, next) => {
  req.user = {
    _id: '5ff2e6bbbcadd11ea4a62655',
  };

  next();
});
app.use(bodyParser.json());
app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
