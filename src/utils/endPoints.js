
// const IMAGE_CLOUDINARY = "https://res.cloudinary.com/duhe9gubt/image/upload/"
const VERSION = "/api/v1";
const STUDIO = `${VERSION}/studios`
const USER = `${VERSION}/users`
const ADMIN = `${VERSION}/admin`


let DASHBOARD = ADMIN || USER || STUDIO



module.exports = {
    STUDIO,
    USER,
    ADMIN,
    DASHBOARD

}
