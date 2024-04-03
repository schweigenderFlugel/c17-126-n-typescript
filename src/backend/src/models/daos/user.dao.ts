export default class userDao {
    private static intance: userDao | null = null;

    private constructor() {}

    static getInstance(): userDao {
        if (!this.intance) {
            this.intance = new userDao();
        }

        return this.intance;
    }

    async createUser(): Promise<void> {
        // TODO: Create user with a DB query
    }
}
