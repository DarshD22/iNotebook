// middleware/fetchuser.js
var jwt = require("jsonwebtoken");
const JMT_SECT = "abcdefghijklmno";

const fetchuser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('auth-token');
              
  // If there's no token, return an unauthorized status
  if (!token) {
    return res.status(401).send({ error: "Access denied. Please log in." });
  }
  

  try {
    // Verify the token
    const data = jwt.verify(token, JMT_SECT );
    // Attach the user object from the token to the request
    req.user = data.user;
    next();
  } catch (error) {
    console.log("errore",error)
    return res.status(401).send({ error: "xxx Invalid token. Please log in." });
  }
};

module.exports = fetchuser;
