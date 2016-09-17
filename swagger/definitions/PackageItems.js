module.exports = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "example": "profanity-cleanser"
    },
    "description": {
      "type": "string",
      "example": "npm module for removing/replacing profane words"
    },
    "dist-tags": {
      "type": "object",
      "example": {
        "latest": "1.0.1"
      }
    },
    "maintainers": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "example": [
        {
          "name": "Shweta Sabne",
          "email": "shwetasabne@gmail.com"
        }
      ]
    },
    "time": {
      "type": "object",
      "example": {
        "created": "2016-03-13T04:30:54.753Z"
      }
    },
    "homepage": {
      "type": "object",
      "example": {
        "url": "shwetasabne.com"
      }
    },
    "keywords": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "example": ["profanity", "cleanser"]
    },
    "repository": {
      "type": "object",
      "example": {
        "type": "git"
      }
    },
    "author": {
      "type": "object",
      "example": {
        "name": "Shweta Sabne",
        "email": "shwetasabne@gmail.com"
      }
    },
    "licenses": {
      "type": "array",
      "items": {
        "type": "object"
      },
      "example": {
        "type": "MIT",
        "url": "https://github.com/shwetasabne/profanity-cleanser/blob/master/LICENSE-MIT"
      }
    },
    "starred": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "example": ["shwetasabne", "foobarxyzabc123"]
    },
    "versions": require("./PackageVersions.js")
  },
  "required": ["name"]
};