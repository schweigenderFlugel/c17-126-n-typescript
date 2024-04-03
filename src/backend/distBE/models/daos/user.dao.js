"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userDao {
    constructor() { }
    static getInstance() {
        if (!this.intance) {
            this.intance = new userDao();
        }
        return this.intance;
    }
    async createUser() {
        // TODO: Create user with a DB query
    }
}
userDao.intance = null;
exports.default = userDao;
