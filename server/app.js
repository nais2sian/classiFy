const express = require('express');
const bodyParser = require('body-parser');
// const fakeItems = require('./data.js')
const { readItems, addItem } = require('./data/api.js')
const cors = require('cors')

// npm i cors   this is so we can make a request from a different port
// otherwise it will be blocked
// 

const ItemTypes = {
  REAL_ESTATE: 'REAL_ESTATE',
  AUTO: 'AUTO',
  SERVICES: 'SERVICES',
};
  
const app = express();
app.use(bodyParser.json());
app.use(cors()) // allow requests from other ports

// In-memory хранилище для объявлений
// let items = fakeItems;

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();


// Создание нового объявления
app.post('/items', (req, res) => {
  const { adName, description, location, category, ...rest } = req.body;

  console.log("BODY:", req.body)

  // Validate common required fields
  if (!adName || !description || !location || !category) {
    return res.status(400).json({ error: 'Missing required common fields' });
  }

  switch (category) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Real estate' });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Auto' });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Services' });
      }
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  const item = {
    id: itemsIdCounter(),
    adName,
    description,
    location,
    category,
    ...rest,
  };

  addItem(item);
  res.status(201).json(item);
});

// Получение всех объявлений
app.get('/items', (req, res) => {
  res.json(readItems());
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  console.log('привет')
  const item = readItems().find(i => i.id === parseInt(req.params.id, 10));
  if (item) {
    // res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const item = readItems().find(i => i.id === parseInt(req.params.id, 10));
  if (item) {
    // Object.assign(item, req.body);
    // res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
  const itemIndex = readItems().findIndex(i => i.id === parseInt(req.params.id, 10));
  if (itemIndex !== -1) {
    // readItems().splice(itemIndex, 1);
    // res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
