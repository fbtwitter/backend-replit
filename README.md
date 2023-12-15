# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges start at https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/

## Start a working express server
in express, routes takes a following structure: app.METHOD(PATH, HANDLER)

- METHOD is an http method in lowercase.
- PATH is a relative path on the server (string, or regular expression).
- HANDLER is a function that express calls when the route is matched. Handler takes the form function(req, res) {...}
  , where req is the request object, and the res is the response object. example:
<br />
``function(req, res) {
  res.send('Response String');
  }``

## Serve an HTML File
To serve an html file you can respond to request with a file using the res.sendFile(path) method by put it inside 
the app.get("/", ...) route handler.

The method needs an absolute file path, so we recommend to use node global variable __dirname to calculate path like 
this: 
``absolutePath = __dirname + "/relativePath/file.ext"``

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

