module.exports = {
  "properties": {
    "_id": {
      "type": "string",
      "example": "org.couchdb.user:shwetasabne"
    },
    "name": {
      "type": "string",
      "example": "shwetasabne"
    },
    "email": {
      "type": "string",
      "example": "shwetasabne@email.com"
    },
    "gravatar_id": {
      "type": "string",
      "example": "c4b64c6e47d970b101d7431d48ce"
    },
    "gravatar": {
      "type": "string",
      "example": "https://secure.gravatar.com/avatar/c4b64c6e47d970b101d7431d48ce"
    }
  },
  "required": ["_id", "name", "email","gravatar", "gravatar_id"]
};