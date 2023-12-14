const CAR_WASHING = "/car-washing/api/v1";


const IMAGE_CLOUDINARY = "https://res.cloudinary.com/duhe9gubt/image/upload/"


const STUDIO = `${CAR_WASHING}/studio`
const USER = `${CAR_WASHING}/user`
const ADMIN = `${CAR_WASHING}/admin`


const DASHBOARD = ADMIN || USER || STUDIO



module.exports = {
    STUDIO,
    USER,
    ADMIN,
    DASHBOARD

}
