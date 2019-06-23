
const {
    AuthController,
} = require('../controllers');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: async (req, h) => {
            const id = req.payload.id;
            const password = req.payload.password;

            return await AuthController.login(id, password);
        }
    }
];
