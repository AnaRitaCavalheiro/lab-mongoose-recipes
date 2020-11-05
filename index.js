const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);

    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: 'miFood',
      level: 'Easy Peasy',
      ingredients:['tasty', 'yumy'],
      cuisine: 'none-existing',
      dishType: 'other',
      duration: 10,
      creator: 'le moi je'
    }). then((createRecipe) => {
      console.log('recipe created', createRecipe)
    });

    Recipe.insertMany(data)
    .then((createManyRecipes) => {
      console.log('Many recipes created', createManyRecipes)


      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then((updateRecipe) => {
        console.log(`Recipe got updated ${updateRecipe}`)
      });

      Recipe.deleteOne({title: 'Carrot Cake'})
      .then((resultFromDeleteOne) => {
        console.log(`one recipe got deleted ${resultFromDeleteOne}`)

        mongoose.connection.close();
      });
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
