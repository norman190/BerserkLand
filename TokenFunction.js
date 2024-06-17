var jwt = require('jsonwebtoken');

async function generateToken(userData) {
    const token = jwt.sign(
        {
            username: userData.username,
            userId: userData.user_id,
            role: userData.role
        },
        'Holy',
        { expiresIn: '1h' }
    );
    console.log(token);
    return token;
}

async function ADMIN(req, res, next) {
    let header = req.headers.authorization;
    if (!header) {
        return res.status(401).send('Unauthorized');
    }

    let token = header.split(' ')[1];

    jwt.verify(token, 'Holy', function (err, decoded) {
        if (err) {
            return res.status(401).send('Unauthorized');
        } else {
            console.log(decoded.role);
            if (decoded.role !== "Admin") {
                return res.status(401).send('Admin only');
            }
        }
        next();
    });
}

async function USER(req, res, next) {
    let header = req.headers.authorization;
    if (!header) {
        return res.status(401).send('Unauthorized');
    }

    let token = header.split(' ')[1];

    jwt.verify(token, 'Holy', function (err, decoded) {
        if (err) {
            return res.status(401).send('Unauthorized');
        } else {
            console.log(decoded);
            if (decoded.role !== "User") {
                return res.status(401).send('User only');
            }
            if (decoded.userId !== req.params.user_id) {
                console.log(decoded.userId, req.params.user_id);
                return res.status(401).send('Your own user ID only');
            }
        }
        next();
    });
}

module.exports = {
    generateToken,
    ADMIN,
    USER
};
