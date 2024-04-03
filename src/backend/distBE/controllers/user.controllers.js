"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userController {
    /**
     * A description of the entire function.
     *
     * @param {Request} req - request object
     * @param {Response} res - response object
     * @return {Promise<void>} returns a promise with void
     */
    static async createUser(req, res) {
        try {
            const { name } = req.body;
            return res.json({ name });
        }
        catch (_a) {
            // TODO: Handle error and use a logger
            return res.status(500).json({ error: "Error creating user" });
        }
    }
}
exports.default = userController;
