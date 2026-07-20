import { IOldHash } from "../interfaces/old-hash.interface";
import { OldHash } from "../models/old-hash.model";

class OldHashesRepository {
    public async create(
        dto: Pick<IOldHash, "_userId" | "hash">,
    ): Promise<void> {
        await OldHash.create(dto);
    }

    public findByParams(params: Partial<IOldHash>): Promise<IOldHash[] | null> {
        return OldHash.find(params);
    }

    public async deleteManyByParams(params: Partial<IOldHash>): Promise<void> {
        await OldHash.deleteMany(params);
    }

    public async deleteOlderThan(date: Date): Promise<number> {
        const { deletedCount } = await OldHash.deleteMany({
            createdAt: { $lt: date },
        });
        return deletedCount;
    }
}

export const oldHashesRepository = new OldHashesRepository();
