import bcrypt from 'bcrypt';

export class HashService {
    static async hashPassword(password: string) {
        if (!password) {
            throw new Error('Password is required');
        }

        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    }

    static async isPasswordValid(passwordHash: string, password: string): Promise<boolean> {
        return bcrypt.compareSync(password, passwordHash);
    }
}
