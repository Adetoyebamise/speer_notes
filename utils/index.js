const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {PAGE_LENGTH} = require("../constants/index")

const messageHandler = (message, success, statusCode, data) => {
      return (response = { message, success, statusCode, data });
};

const tokenHandler = (data) => {
      var { _id } = data;
      var token = jwt.sign({ userId: _id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE_IN,
      });
      return { token, userId: _id };
};

const tokenVerifier = (req, res, next) => {
  console.log("req.query", req.query)
      try {
        if (req.get("Authorization") !== undefined) {
          const token = req.get("Authorization").replace("Bearer ", "");
          console.log("token", token)
          jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            console.log("decoded", decoded)
            if (err) {
              return res.status(401).json({ result: "Unauthorized, Session Expired", status: 401 });
            } else {
              let {userId, iat, exp} = decoded;
              // let userId ;
              console.log("userId", userId)
              if (req.method === "POST") {
                userId = req.body.hasOwnProperty("userId") 
                  ? req.body.userId
                  : "";
              } else if (req.method === "GET") {
                userId = req.params.hasOwnProperty("userId")
                  ? req.params.userId
                  : req.query.userId;
              } else if (req.method === "PUT") {
                userId = req.body.hasOwnProperty("userId")
                  ? req.body.userId
                  : req.params.userId;
              } else if (req.method === "DELETE") {
                userId = req.params.hasOwnProperty("userId")
                  ? req.params.userId
                  : req.query.userId;
              }
              if (userId === decoded.userId) {
                req.payload = decoded;
                next();
              } else {
                return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
              }
            }
          });
        } else {
          return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
        }
      } catch {
        return res.status(401).json({ result: "Unauthorized, Access Denied", status: 401 });
      }
};

const AlphaNumeric = (length, type = "alpha") => {
      var result = "";
      var characters =
        type === "alpha"
          ? "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789"
          : "123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
};

const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, dbpassword) => {
      return await bcrypt.compare(password, dbpassword);
};

const queryConstructor = (query, sortBy, item) => {
  let params = {};

  let array = Object.keys(query);
  for (let i = 0; i < array.length; i++) {
    if (Object.keys(query)[i] === "id") {
      params["_id"] = mongoose.Types.ObjectId(Object.values(query)[i]);
    } else if (Object.keys(query)[i] === "userId") {
      params[Object.keys(query)[i]] = mongoose.Types.ObjectId(
        Object.values(query)[i]
      );
    } else {
      params[Object.keys(query)[i]] = Object.values(query)[i];
    }
  }

  let { limit, skip, sort } = params;
  limit = limit ? Number(limit) : PAGE_LENGTH;
  skip = skip ? Number(skip) : 0;

  if (sort === "asc" || sort === "desc") {
    if (typeof sortBy === "object") {
      let first = sortBy[Object.keys(sortBy)[0]];
      let second = sortBy[Object.keys(sortBy)[1]];

      sort =
        sort === "asc"
          ? { [first]: 1, [second]: 1 }
          : { [first]: -1, [second]: -1 };
    } else {
      sort = sort === "asc" ? { [sortBy]: 1 } : { [sortBy]: -1 };
    }
  } else if (sort == undefined) {
    sort = { [sortBy]: 1 };
  } else {
    return {
      error: `Unable to find ${item} might be because of invalid params`,
    };
  }

  delete params.limit;
  delete params.skip;
  delete params.sort;
  return { params, limit, skip, sort };
};

module.exports = { messageHandler, tokenHandler, tokenVerifier, AlphaNumeric, hashPassword, verifyPassword, queryConstructor};