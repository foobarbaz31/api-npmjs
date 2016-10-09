module.exports = {
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "example": "profanity-cleanser"
      },
      "version": {
        "type": "string",
        "example": "1.0.1"
      },
      "description": {
        "type": "string",
        "example": "npm module for removing/replacing profane word"         
      },
      "main": {
        "type": "string",
        "example": "index.js"
      },
      "scripts": {
        "type": "object",
        "example": {
          "test": "mocha --recursive"
        }
      },
      "repository": {
        "type": "object",
        "example": {
          "type": "git"
        }
      },
      "keywords": {
        "type": "array",
        "example": ["profanity", "cleaner"]
      },
      "author": {
        "type": "object",
        "example": {
          "name": "Shweta Sabne"
        }
      },
      "bugs": {
        "type": "object"
      },
      "homepage": {
        "type": "string"
      },
      "devDependencies": {
        "type": "string"
      },
      "dependencies": {
        "type": "object"
      },
      "licenses": {
        "type": "array"
      },
      "maintainers": {
        "type": "array"
      }
    }
  }
};