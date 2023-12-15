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

using "req.params"

## Get query parameter input from the client

Query parameter / query string is encoded the data at after the routh path. 

- The query string is delimited by a 
question mark (?). 
- includes field=value. 
- Each couple separated by an ampersand (&).

in query string, some characters like the percent (%), cannot be in URLs and have to be encoded in a different 
format before you can pass them.

example: 
```javascript
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

using "req.query"

you can also chaining route by using app.route method, and it become like this 

```javascript
app.route(PATH).get(HANDLER).post(HANDLER).put(HANDLER);
etc..
```

## Use body-parser to parse POST request

besides GET, there is POST. POST is the default method used to send client data with HTML forms. Also in conventions,
POST is used to send data to create new items in the database (a new user, or a new blog post)

in these kind of requests, the data doesn't appear in the URL, it is hidden in the request body. body is part of the 
HTTP request that also called the "payload". 

even though the data is not visible in the URL, this doesn't mean that it is private.

The raw content of an HTTP POST request:
```javascript
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```

To parse the data coming from POST requests, you must use the "body-parser" package. This package allows you to use a 
series of middleware, which can decode data in different formats.

The middleware to handle URL encoded data is returned by
```javascript
bodyParser.urlencoded({extended: false})
```

Note: extended is a configuration option that tells body-parser which parsing needs to be used. When extended=false it uses the classic encoding querystring library. When extended=true it uses qs library for parsing.

When using "extended=false", values can be only strings or arrays. The object returned when using querystring does not prototypically inherit from the default JavaScript Object, which means functions like hasOwnProperty, toString will not be available. The extended version allows more data flexibility, but it is outmatched by JSON.

## Get Data from POST Requests
If the body-parser is configured correctly, you should find the parameters in the object req.body. Have a look at 
the usual library example :

```javascript
route: POST '/library'
urlencoded_body: userId=546&bookId=6754
req.body: {userId: '546', bookId: '6754'}
```

also, there are several other HTTP methods. The conventional mapping is:

- POST (sometimes PUT) - Create a new resource using the information sent with the request.
- GET - Read an existing resource without modifying it.
- PUT or PATCH (sometimes POST) - Update a resource using the data sent.
- DELETE - Delete a resource.
- etc, couple of other methods which are used to negotiate a connection with the server.

Except GET, all other methods listed above can have a payload (i.e. the data into the request body)
