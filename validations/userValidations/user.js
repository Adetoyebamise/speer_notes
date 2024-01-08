const { User } = require("../../schema/userSchema")

const userRegistration = {
      name: {
            notEmpty: true,
            errorMessage: "Name is required"
      },
      email: {
            notEmpty: true,
            errorMessage: "Email is required",
            isEmail: true,
            custom: {
                  options: value => {
                      return User.find({
                              email: value
                      }).then(user => {
                          if (user.length > 0) {
                              return Promise.reject('Email is already in use')
                          }
                      })
                  }
            }
      },
      password: {
            notEmpty: true,
            errorMessage: "Password is required"
      }
}

const userLogin = {
      email: {
            notEmpty: true,
            errorMessage: "Email is required"
      },
      password: {
            notEmpty: true,
            errorMessage: "Password is required"
      }
}


const passwordReset = {
      userId: {
            notEmpty: true,
            errorMessage: "UserId is required"
      },
      otp: {
            notEmpty: true,
            errorMessage: "Token is required"
      },
      newPassword: {
            notEmpty: true,
            errorMessage: "New Password is required"
      }
}

module.exports = { userRegistration, userLogin, passwordReset }