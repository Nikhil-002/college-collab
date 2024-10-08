const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

// const __dirname = path.resolve();


// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());


// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
  // Connect Database
    connectDB();
   console.log(`Server started on port ${PORT}`)
  });
