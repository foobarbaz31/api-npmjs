module.exports = {
  "properties": {
    "statusCode": {
      "type": "integer",
      "example": 404
    },
    "error": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": ["statusCode", "message"]
};