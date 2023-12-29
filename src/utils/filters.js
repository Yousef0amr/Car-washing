const globalFilter = { updatedAt: false, createdAt: false }
const studioFilter = { ...globalFilter, email: false, password: false, role: false, isLoggedIn: false, isAccepted: false }
const userFilter = { ...studioFilter }





module.exports = {
    globalFilter,
    studioFilter,
    userFilter
}