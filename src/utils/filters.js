const globalFilter = { updatedAt: false, createdAt: false }
const studioFilter = { ...globalFilter, email: false, password: false, role: false, isLoggedIn: false, isAccepted: false }
const userFilter = { ...studioFilter, favorites: false }





module.exports = {
    globalFilter,
    studioFilter,
    userFilter
}