module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "npm stats",
    "description": "API to provide endpoints for various npm stats for packages",
    "version": "1.0"
  },
  "basePath": "/v1",
  "paths": {
    "/package_info": {
      "get": {
        "tags": [
          "packages"
        ],
        "x-swagger-router-controller": "packages",
        "operationId": "getPackageInfo",
        "description": "Returns an array with the downloads per day for requested package in requested range",
        "parameters": [
          { "$ref": "#/parameters/package" }
        ],
        "responses": {
          "200": {
            "description": "Successful request",
            "schema": {
              "$ref": "#/definitions/PackageDef"
            }
          }
        }
      }
    },
    "/range_downloads": {
      "get": {
        "tags": [
          "downloads"
        ],
        "x-swagger-router-controller": "downloads",
        "operationId": "getRangeDownloads",
        "description": "Returns an array with the downloads per day for requested package in requested range",
        "parameters": [
          { "$ref": "#/parameters/package" },
          { "$ref": "#/parameters/start" },
          { "$ref": "#/parameters/end" },
        ],
        "responses": {
          "200": {
            "description": "Successful request.",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/Downloads"
                },
                {
                  "properties": {
                    "downloads": {
                      "type": "array",
                      "items": {
                        "$ref": "#/definitions/RangeDownloads"
                      }
                    }
                  }
                },
                {
                  "required": ["downloads"]
                }
              ]
            }
          },
          "404": {
            "description": "Something wrong happened.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/point_downloads": {
      "get": {
        "tags": [
          "downloads"
        ],
        "x-swagger-router-controller": "downloads",
        "operationId": "getPointDownloads",
        "description": "Returns the total downloads for requested package in requested range",
        "parameters": [
          { "$ref": "#/parameters/package" },
          { "$ref": "#/parameters/start" },
          { "$ref": "#/parameters/end" },
        ],
        "responses": {
          "200": {
            "description": "Successful request.",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/Downloads"
                },
                {
                  "properties": {
                    "downloads": {
                      "type": "integer"
                    }
                  }
                },
                {
                  "required": ["downloads"]
                }
              ]
            }
          },
          "404": {
            "description": "Something wrong happened.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    }
  },
  "parameters": {
    "package": require("./parameters/Package.js"),
    "start": require("./parameters/Start.js"),
    "end": require("./parameters/End.js"),
  },
  "definitions": {
    "Error": require("./definitions/Error.js"),
    "Downloads": require("./definitions/Downloads.js"),
    "RangeDownloads": require("./definitions/RangeDownloads.js"),
    "PackageDef": require("./definitions/PackageItems.js")
  }
};
