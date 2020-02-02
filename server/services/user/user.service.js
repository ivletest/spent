const db = require("../../models/index");
const errors = require("restify-errors");

async function authenticate(loginUser) {
    const user = User.findOne({ where: loginUser.email });

    if (bcrypt.compareSync(loginUser.password, user.password)) {
        return await authorize(user);
    }

    throw new errors.UnauthorizedError("Invalid credentials");
};

async function authorize(user) {
    const authToken = await db.AuthToken.generate(user.id);
    await user.addAuthToken(authToken);

    return { user, authToken };
};

async function logout(token) {
    await db.AuthToken.destroy({ where: { token } });
};

async function create(registerUser) {
    let result;

    await db.User.findOrCreate({
        where: { email: registerUser.email },
        defaults: {
            name: registerUser.username,
            passwordHash: registerUser.passwordHash,
            email: registerUser.email,
            role: registerUser.role
        }
    }).spread(async (user, created) => {

        if (!created) {
            throw new errors.ConflictError("User already exists.");
        }

        const data = await authorize(user);
        result = {
            token: data.authToken.token,
            uid: data.authToken.uid,
            data: {
                username: data.user.name,
                email: data.user.email
            }
        }
    });

    return result;
}

module.exports = {
    create,
    logout,
    authorize,
    authenticate
};