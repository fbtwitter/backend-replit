# Backend Challenges boilerplate - package.json
[![Run on Repl.it](https://repl.it/badge/github/freeCodeCamp/boilerplate-npm)](https://repl.it/github/freeCodeCamp/boilerplate-npm)

### Semantic Versioning
Major.Minor.Patch
- Patch more like bug fixes
- Minor add features on the backwards-compatibility without break what worked before
- Major add changes that won't work with earlier versions

### Tilde Characters 
To allow an npm dependency to update to the latest PATCH version, you can prefix the dependency’s version with the 
tilde (~) character. like this: "package": "~1.3.8"

### Caret Characters
The caret (^) allows npm to install future updates as well. The difference is that the caret will allow both MINOR 
updates and PATCHes. like this: "package": "^1.3.8"
