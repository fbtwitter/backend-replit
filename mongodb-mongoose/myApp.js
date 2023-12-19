require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

// Event handling for successful connection
db.on('connected', () => {
  console.log('Connected to MongoDB')
})

// Event handling for connection errors
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`)
})

// Event handling for disconnection
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB')
})

// Close the Mongoose connection on Node.js process termination
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
  })
})

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person

Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  let newPerson = new Person({ name: 'John', age: 25, favoriteFoods: ['Avocado Fruit'] })
  // Save the document to db
  newPerson.save(function (err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

let arrayOfPeople = [
  { name: 'Doe', age: 24, favoriteFoods: ['Banana Fruit'] },
  { name: 'Yay', age: 25, favoriteFoods: ['Noodle', 'Dragon Fruit', 'Banana Fruit'] },
  { name: 'Nay', age: 24, favoriteFoods: ['Squid', 'Octopus', 'All based vegetables'] },
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.error(err)
    done(null, data)
  })
}

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger'

  Person.findById(personId, function (err, data) {
    if (err) return console.error(err)

    data.favoriteFoods.push(foodToAdd)

    data.save((err, updatedData) => {
      if (err) return console.error(err)
      done(null, updatedData)
    })
  })
}

const findAndUpdate = (personName, done) => {
  const ageToSet = 20

  // findOneAndUpdate uses ( conditions , update , options , callback ) as arguments

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, data) => {
      if (err) return console.error(err)
      done(null, data)
    },
  )
}

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
}

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary'

  Person.remove({name: nameToRemove}, (err, data) => {
    if(err) return console.error(err)
    done(null, data)
  })
}

const queryChain = (done) => {
  const foodToSearch = "burrito";

  const findQuery = Person.find({ favoriteFoods: foodToSearch });

  findQuery.sort({ name: 1 });
  findQuery.limit(2);
  findQuery.select({ age: 0 });
  findQuery.exec((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

/** **Well Done !!**
 /* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person
exports.createAndSavePerson = createAndSavePerson
exports.findPeopleByName = findPeopleByName
exports.findOneByFood = findOneByFood
exports.findPersonById = findPersonById
exports.findEditThenSave = findEditThenSave
exports.findAndUpdate = findAndUpdate
exports.createManyPeople = createManyPeople
exports.removeById = removeById
exports.removeManyPeople = removeManyPeople
exports.queryChain = queryChain
