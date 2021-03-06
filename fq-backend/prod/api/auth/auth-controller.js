"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _stringUtil = require("../../utilities/string-util");

var _mongodb = require("mongodb");

var _argon = _interopRequireDefault(require("argon2"));

var _authService = require("../../services/auth-service");

function index(_x, _x2) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var validation, client, db, user, pwMatch, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(process.env.MONGO_USER);
            validation = validateIndex(req.body);

            if (validation.isValid) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: validation.message
            }));

          case 4:
            _context.next = 6;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.rlklw.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 6:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'pub-quiz');
            _context.next = 10;
            return db.collection('users').findOne({
              username: req.body.username.toLowerCase()
            });

          case 10:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 13:
            _context.next = 15;
            return _argon["default"].verify(user.password, req.body.password);

          case 15:
            pwMatch = _context.sent;

            if (pwMatch) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 18:
            client.close();
            token = (0, _authService.generateJWT)(user);
            return _context.abrupt("return", res.status(200).json({
              token: token
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _index.apply(this, arguments);
}

function validateIndex(body) {
  var errors = '';

  if (_stringUtil.StringUtil.isEmpty(body.username)) {
    errors += 'Username required. ';
  }

  if (_stringUtil.StringUtil.isEmpty(body.password)) {
    errors += 'Password required. ';
  } // if (StringUtil.isEmpty(body.email)) {
  //   errors += 'Email required. '
  // }


  return {
    isValid: _stringUtil.StringUtil.isEmpty(errors),
    message: errors
  };
}