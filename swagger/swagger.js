module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "npm stats",
    "description": "API to provide endpoints for various npm stats for packages. <a href='https://github.com/shwetasabne/api-npmjs'>Report Issues here!</a>",
    "version": "1.0"
  },
  "basePath": "/v1",
  "paths": {
    "/package/info": {
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
          },
          "404": {
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/package/depended": {
      "get": {
        "tags": [
          "packages"
        ],
        "x-swagger-router-controller": "packages",
        "operationId": "getPackageDepended",
        "description": "Get all packages that are depended upon a given package name.",
        "parameters": [
          { "$ref": "#/parameters/package" }
        ],
        "responses": {
          "200": {
            "description": "Successful request",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/PackageDepended"
              }
            }
          },
          "404": {
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }         
        }
      }
    },
    "/package/starred": {
      "get": {
        "tags": [
          "packages"
        ],
        "x-swagger-router-controller": "packages",
        "operationId": "getPackageStarred",
        "description": "Find out which users have starred the given package.",
        "parameters": [
          { "$ref": "#/parameters/package" }
        ],
        "responses": {
          "200": {
            "description": "Successful request",
            "schema": {
              "type": "array",
              "items": {
                "type": "string",
                "example": "ssabne"
              }
            }
          },
          "404": {
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }         
        }
      }
    },
    "/package/keyword": {
      "get": {
        "tags": [
          "packages"
        ],
        "x-swagger-router-controller": "packages",
        "operationId": "getPackageKeyword",
        "description": "Find all packages that matches the giving keywords",
        "parameters": [
          { "$ref": "#/parameters/package" }
        ],
        "responses": {
          "200": {
            "description": "Successful request",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/PackageDepended"
              }
            }
          },
          "404": {
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }         
        }
      }
    },
    "/downloads/range": {
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
    "/downloads/point": {
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
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/user/get": {
      "get": {
        "tags": [
          "users"
        ],
        "x-swagger-router-controller": "users",
        "operationId": "getUserInfo",
        "description": "Get profile information for a given user.",
        "parameters": [
          { "$ref": "#/parameters/username" },
        ],
        "responses": {
          "200": {
            "description": "Successful request.",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/UserInfo"
              }
            }
          },
          "404": {
            "description": "Not Found.",
            "schema": {
              "$ref": "#/definitions/Error"
            }
          }
        }
      }
    },
    "/user/packageList": {
      "get": {
        "tags": [
          "users"
        ],
        "x-swagger-router-controller": "users",
        "operationId": "getUserPackageList",
        "description": "List all packages that the user maintains.",
        "parameters": [
          { "$ref": "#/parameters/username" },
        ],
        "responses": {
          "200": {
            "description": "Successful request.",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/PackageDepended"
              }
            }
          },
          "404": {
            "description": "Not Found.",
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
    "username": require("./parameters/Username.js")
  },
  "definitions": {
    "Error": require("./definitions/Error.js"),
    "Downloads": require("./definitions/Downloads.js"),
    "RangeDownloads": require("./definitions/RangeDownloads.js"),
    "PackageDef": require("./definitions/PackageItems.js"),
    "PackageDepended": require("./definitions/PackageDepended.js"),
    "UserInfo": require("./definitions/UserInfo.js")
  }
};
