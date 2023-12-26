const { expressjwt } = require('express-jwt');
const secret = process.env.ACCESS_TOKEN_SECRET
const endpoints = require('./../utils/endPoints')


const checkUrl = (req, allowedRoutes) => {
    const matches = allowedRoutes.some(route =>
        req.method === route.method &&
        req.originalUrl.includes(route.url)
    );
    return !matches;
};



const isRevoked = (req, token) => {
    const role = token.payload.role;
    let isAllowed = false

    switch (role) {
        case 'user':
            isAllowed = checkUrl(req, [
                { method: 'GET', url: `${endpoints.USER}/get-user` },
                { method: 'POST', url: '/api/v1/posts' },
                { method: 'PATCH', url: '/api/v1/posts' },
                { method: 'DELETE', url: '/api/v1/posts' },
            ]);
            if (isAllowed) {

            }
            return true
        case 'studio':
            isAllowed = checkUrl(req, [
                { method: 'GET', url: `${endpoints.STUDIO}/get-user` },
                { method: 'POST', url: '/api/v1/posts' },
                { method: 'PATCH', url: '/api/v1/posts' },
                { method: 'DELETE', url: '/api/v1/posts' },
            ]);
            if (isAllowed) {

            }
            return true
        case 'admin':

            return false;
        default:
            return true;
    }
};

const authOperationsRegex = (user) => new RegExp(`^${user}
    /(?:register|login|verify-email|forget-password|reset-password|resend-code|check-email)$`
    , 'i');

const authJwt = expressjwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked
}).unless(
    {
        path: [
            { url: authOperationsRegex(endpoints.USER), method: ["POST", 'OPTIONS'] },
            { url: authOperationsRegex(endpoints.STUDIO), method: ["POST", 'OPTIONS'] },
        ]
    }
)


module.exports = authJwt