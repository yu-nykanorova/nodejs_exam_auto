import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
    public create(dto: Partial<IActionToken>): Promise<IActionToken> {
        return ActionToken.create(dto);
    }

    public getByToken(token: string): Promise<IActionToken | null> {
        return ActionToken.findOne({ token });
    }

    public async deleteActionToken(
        params: Partial<IActionToken>,
    ): Promise<void> {
        await ActionToken.deleteOne(params);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
