const ErrNo = Object.freeze({   
    success: 0, 
    invalidParm: 1,

    userNotExist: 100, 
    userExist: 101,
    userInvalidPWD: 102,
    userNotLogin: 103,
    userAlreadyLogin: 104,
    userTokenInvalid: 105,

    serverError: 500
})

module.exports = {ErrNo}