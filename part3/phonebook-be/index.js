require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

morgan.token('body', (request, _response) => JSON.stringify(request.body));

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(morgan((tokens, request, response) => [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  tokens.body(request, response),
].join(' ')));

const { PORT } = process.env;

app.get('/info', (request, response) => {
  Person
    .countDocuments({})
    .then((result) => {
      response.send(`
        <p>
          Phonebook has info for ${result}
          ${result === 1 ? 'person' : 'people'}
        </p>
        <p>${Date()}</p>
      `);
    });
});

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((result) => response.json(result));
});

app.get('/api/persons/:id', (request, response) => {
  const { id } = request.params;
  Person
    .findById(id)
    .then((result) => response.json(result));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  Person
    .findByIdAndRemove(id)
    .then((_result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  Person
    .findOne({ name: body.name })
    .then((result) => {
      if (result) {
        response.status(400).send({
          error: 'name must be unique',
        });
      } else {
        const person = new Person({ ...body });
        return person
          .save()
          .then((savedPerson) => response.json(savedPerson));
      }
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  const { body } = request;
  const person = { ...body };

  Person
    .findByIdAndUpdate(
      id,
      person,
      { new: true, runValidators: true, context: 'query' },
    )
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
