import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
    public create(dto: Partial<IToken>): Promise<IToken> {
        return Token.create(dto);
    }

    public findByParams(params: Partial<IToken>): Promise<IToken | null> {
        return Token.findOne(params);
    }

    public async deleteTokenPair(refreshToken: string): Promise<void> {
        await Token.deleteOne({ refreshToken });
    }

    public async deleteAllByParams(params: Partial<IToken>): Promise<void> {
        await Token.deleteMany(params);
    }

    public async deleteBeforeDate(date: Date): Promise<number> {
        const result = await Token.deleteMany({ createdAt: { $lt: date } });
        return result.deletedCount;
    }
}

export const tokenRepository = new TokenRepository();