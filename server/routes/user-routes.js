const path = require("path");
const db = require("./../../db/models/index");

module.exports = function(app) {
  app.post("/api/users", function(req, res) {
    let user_data = req.body;
    console.log("req body", user_data);
    db.user
      .findOrCreate({
        where: { fuid: user_data.fuid },
        defaults: {
          user_name: user_data.user_name,
          email: user_data.email,
          bio: user_data.bio
        }
      })
      .spread((user, created) => {
        console.log(
          user.get({
            plain: true
          })
        );
        console.log(created);
      });
  });
};
