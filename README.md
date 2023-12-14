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
