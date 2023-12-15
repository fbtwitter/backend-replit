# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges
start at https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/

## Start a working express server

in express, routes takes a following structure: app.METHOD(PATH, HANDLER)

- METHOD is an http method in lowercase.
- PATH is a relative path on the server (string, or regular expression).
- HANDLER is a function that express calls when the route is matched. Handler takes the form function(req, res) {...}
  , where req is the request object, and the res is the response object. example:
  <br />

```javascript
function expressServer(req, res) {
  res.send('Response String');
}
  ```

## Serve an HTML File

To serve an html file you can respond to request with a file using the res.sendFile(path) method by put it inside
the app.get("/", ...) route handler.

The method needs an absolute file path, so we recommend to use node global variable __dirname to calculate path like
this:

```javascript
absolutePath = __dirname + "/relativePath/file.ext"
```

## Serve static assets

To serve static assets you need to use middleware **express.static(path)**, where the path is the absolute path of the
folder containing the assets

A middleware needs to be mounted using the method **app.use(path, middlewareFunction)**. the first path argument is
optional. if you don't pass it, the middleware will be executed for all requests.

## Serve JSON on a specific route

- HTML server serves HTML
- API serves data
- REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need to know where
  the resources is (the URL), and the action it wants to perform on it (the verb)
- the preferred data format for moving information around the web is **JSON** (the default)

GET : used to fetch some information, without modifying anything.

this is as simple with the usual, and inside the route handler use the method **res.json()**. Behind the scenes, it
converts a valid JavaScript object into a string.

also sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back.

A valid object has the usual structure **({key: data}**.

## use the .env file

**.env** file is a hidden file that is used to pass environment variables to your application.

The environment variables are accessible from the app as process.env.VAR_NAME

- The process.env object is a global Node object, and variables are passed as strings.
- By convention, the variable names are all uppercase, with words separated by an underscore.
- The .env is a shell file,
  so you don’t need to wrap names or values in quotes.
- It is also important to note that there cannot be space around the equals sign when you are assigning values to your
  variables, e.g. VAR_NAME=value.

## Implement a Root-Level request logger middleware

in more detail, middleware functions take 3 arguments.

- request,
- response,
- next

These functions execute some code that can have side effects on the app, and usually add information to the request or
response objects.

They can also be end the cycle by sending a response (res) when some condition met. and if they don't send the
response when they are done, they start to execute the third function **next** (next())).

```javascript
function expressServer(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

Note: Express evaluates functions in the order they appear in the code. This is true for middleware too. If you want it to work for all the routes, it should be mounted before them.

## Chain middleware to create a time server

Middleware can be mounted at a specific route using app.METHOD(path, middlewareFunction), and also it can be chained 
withing a route definition like this:

```javascript
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
```

This approach can also be used to perform some validation on the data, block the execution of the current chain and 
pass control to function specifically to handle errors.

## Get Route Parameter Input from the Client

you can capture values by using req.params object with the results like this;

```javascript
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```


