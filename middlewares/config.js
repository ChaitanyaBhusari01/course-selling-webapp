const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const mongodburl = process.env.MONGODBURL;
const port = process.env.PORT;

module.exports = {
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET,
    mongodburl,
    port,
}