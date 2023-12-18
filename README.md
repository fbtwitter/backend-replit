# MongoDB and Mongoose Challenges

This is the boilerplate for the MongoDB and Mongoose lessons. Instructions for completing these lessons start at https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/


## Install and setup mongoose

To set up a hosted database on MongoDB Atlas you can follow [this tutorial](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)

Next, add MONGO_URI variable inside your .env file. When you are done, connect to the database by calling the 
connect method with the following syntax:

```javascript
mongoose.connect(<Your URI>, { useNewUrlParser: true, useUnifiedTopology: true });
```

## Create a model

To create a model in mongodb using mongoose you first need to build a Schema. Each schema maps to a MongoDB 
collection that defines the shape of the document.

Schemas are building block for Models that can be nested to create complex models. A model allows you to create 
instance of your objects called documents.

Example:
```javascript
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})
```

## Create and Save a model

To save or record a model, create a "document" instance using the model constructor and then pass the required value 
in each fields. After that, call the method "document".save()

like this:
```javascript
person.save(function(err, data) {
  //   ...do your stuff here...
});
```

## Create Many Records
