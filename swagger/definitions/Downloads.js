module.exports = {
  "properties": {
    "package": {
      "type": "string",
      "example": "express"
    },
    "start": {
      "type": "string",
      "format": "date",
      "example": "2016-01-01"
    },
    "end": {
      "type": "string",
      "format": "date",
      "example": "2016-08-01"
    }
  },
  "required": ["package", "start", "end"]
};