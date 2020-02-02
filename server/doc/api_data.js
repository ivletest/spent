define({ "api": [
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Registers new user.",
    "name": "RegisterUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Longer than 2 characters required.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Valid email required.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Both upper and lower case letters and a number required.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Name of the newly created user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the newly created user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400 BadRequest": [
          {
            "group": "400 BadRequest",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>The username, email or password are invalid.</p>"
          }
        ],
        "409 Conflict": [
          {
            "group": "409 Conflict",
            "optional": false,
            "field": "Conflict",
            "description": "<p>User already exists.</p>"
          }
        ],
        "500 InternalServerError": [
          {
            "group": "500 InternalServerError",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/auth.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./documentation/main.js",
    "group": "C:\\Users\\karak\\source\\repos\\spent\\server\\documentation\\main.js",
    "groupTitle": "C:\\Users\\karak\\source\\repos\\spent\\server\\documentation\\main.js",
    "name": ""
  }
] });
