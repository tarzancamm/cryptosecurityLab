const users = []

const bcrypt = require('bcrypt')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')

      const { username, password } = req.body

      let userData

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          userData = users[i]
        }
      }
        if (userData === undefined) {
          res.status(400).send({success: false, message: "Incorrect Username of Password"})
        } else {
          bcrypt.compare(password, userData.password, function(error, success) {
            if (!error){
              if (success){
                res.status(200).send(userData)
              } else {
                res.status(400).send('Incorrect Password')
              }
            } else {
              console.log('bcrypt had an error comparing passwords: ')
              console.log(error)
              res.status(500).send({success: false, message: "backend error"})
            }
          });
        }
        console.log(userData)
    },
    register: (req, res) => {
      const saltRounds = 10
      bcrypt.hash(req.body.password, saltRounds, function(error, hashPass) {
        req.body.password = hashPass
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
     });
    }
}
