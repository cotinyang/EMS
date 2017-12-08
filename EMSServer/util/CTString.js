var CTString = module.exports = function CTString() {};

CTString.toString = function (obj) {
    return JSON.stringify(obj, null, 2)
}
    