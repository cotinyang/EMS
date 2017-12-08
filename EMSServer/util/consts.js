const ErrNo = Object.freeze({   
    success: 0, 
    invalidParm: 1,

    userNotExist: 100, 
    userExist: 101,
    userInvalidPWD: 102,
})

module.exports = {ErrNo}