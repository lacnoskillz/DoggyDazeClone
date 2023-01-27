const express = require('express');
const session = require('express-session');
const app = express();
// import sequelize connection
const sequelize = require('./config/connection')

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/homeRoutes'));

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}. Hi Micahel & Kai`)
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  });

  