define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "User login.",
    "name": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password.</p>"
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
            "description": "<p>Name of the logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the logged in user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"username\": \"name\",\n    \"email\": \"mail@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 BadRequest": [
          {
            "group": "400 BadRequest",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid credentials.</p>"
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
      },
      "examples": [
        {
          "title": "BadRequest",
          "content": "HTTP/1.1 409 Bad Request\n{\n    \"code\": \"BadRequest\",\n    \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/auth/logout",
    "title": "User logout.",
    "name": "Logout",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "auth_token",
            "description": "<p>Authentication token.</p>"
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
            "description": "<p>Invalid input data.</p>"
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
      },
      "examples": [
        {
          "title": "BadRequest",
          "content": "HTTP/1.1 409 Bad Request\n{\n    \"code\": \"BadRequest\",\n    \"message\": \"Invalid input data\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "User registration.",
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
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created\n{\n   \"username\": \"name\",\n    \"email\": \"mail@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 BadRequest": [
          {
            "group": "400 BadRequest",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Invalid credentials.</p>"
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
      },
      "examples": [
        {
          "title": "Conflict",
          "content": "HTTP/1.1 409 Conflict\n{\n    \"code\": \"Conflict\",\n    \"message\": \"User already exists.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "patch",
    "url": "/auth/validate/:uid?validation_uid=:uid",
    "title": "Email validation.",
    "name": "Validation",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "uid",
            "description": "<p>User Uid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "validation_uid",
            "description": "<p>Email validation uid.</p>"
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
            "description": "<p>Name of the logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the logged in user.</p>"
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
            "description": "<p>Invalid input data.</p>"
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
      },
      "examples": [
        {
          "title": "BadRequest",
          "content": "HTTP/1.1 409 Bad Request\n{\n    \"code\": \"BadRequest\",\n    \"message\": \"Invalid input data\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.controller.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/:uid/accounts/create",
    "title": "Create account.",
    "name": "CreateAccount",
    "group": "Financial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userUid",
            "description": "<p>User uid.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>Sets account to private.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "balance",
            "description": "<p>Account balance.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Account currency.</p>"
          },
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "parentAccountUid",
            "description": "<p>If not null account as a sub account.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "uid",
            "description": "<p>Uid of the account.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Account currency.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created\n{\n    \"uid\": \"a3ed181c-3519-4bc0-9889-be9ee9069006\",\n    \"isPrivate\": true,\n    \"balance\": \"200\",\n    \"currency\": \"mkd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 BadRequest": [
          {
            "group": "400 BadRequest",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>User does not exist.</p>"
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
      },
      "examples": [
        {
          "title": "BadRequest",
          "content": "HTTP/1.1 409 Bad Request\n{\n    \"code\": \"BadRequest\",\n    \"message\": \"User does not exist.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/account.controller.js",
    "groupTitle": "Financial"
  },
  {
    "type": "get",
    "url": "/:uid/accounts",
    "title": "Get all accounts.",
    "name": "GetAllAccounts",
    "group": "Financial",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "userUid",
            "description": "<p>User uid.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPrivate",
            "description": "<p>Tells if the account is private.</p>"
          },
          {
            "group": "Parameter",
            "type": "Decimal",
            "optional": false,
            "field": "balance",
            "description": "<p>Account balance.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "UUID",
            "optional": false,
            "field": "uid",
            "description": "<p>Uid of the account.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>Account currency.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 Created\n{\n    \"uid\": \"a3ed181c-3519-4bc0-9889-be9ee9069006\",\n    \"isPrivate\": true,\n    \"balance\": \"200\",\n    \"currency\": \"mkd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400 BadRequest": [
          {
            "group": "400 BadRequest",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>User does not exist.</p>"
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
      },
      "examples": [
        {
          "title": "BadRequest",
          "content": "HTTP/1.1 409 Bad Request\n{\n    \"code\": \"BadRequest\",\n    \"message\": \"User does not exist.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/account.controller.js",
    "groupTitle": "Financial"
  }
] });
