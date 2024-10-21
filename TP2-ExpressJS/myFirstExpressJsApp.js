const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`you are ready! the server is running on server ${PORT}`);
});


let MYArray = [];

app.post('/MYArray', (req, res) => {
  const newItemInArray = req.body;
  MYArray.push(newItemInArray);
  res.status(201).json({ message: 'Item added!', item: newItemInArray });
});
app.get('/items', (req, res) => {
    res.json({ MYArray });
  });
  
  app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ItemInArray  = MYArray[id];
  
    if ( ItemInArray ) {
      res.json({ ItemInArray });
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });
  

  app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
  
    if (MYArray[id]) {
        MYArray[id] = updatedItem;
      res.json({ message: 'Item updated!', item: updatedItem });
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });




  app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    if (MYArray[id]) {
        MYArray.splice(id, 1);
      res.json({ message: 'Item deleted!' });
    } else {
      res.status(404).json({ message: 'Item not found!' });
    }
  });
  
  