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

CRUD - CREATE
