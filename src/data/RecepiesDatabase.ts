import { Recepie } from "../model/Recepie";
import { BaseDatabase } from "./BaseDatabase";

export class RecepiesDatabase extends BaseDatabase {
    public async createRecepie(recepies: Recepie): Promise<void> {
        try {
            await BaseDatabase.connection("cookenu_recepies")
                .insert({
                    id: recepies.getId(),
                    title: recepies.getTitle(),
                    description: recepies.getDescription(),
                    date: recepies.getDate()
                })
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    public async getUserById (id: string): Promise<any> {
        const recepie = await BaseDatabase.connection("cookenu_recepies")
            .select("*")
            .where({ id });
        return recepie[0]
    }catch (error: any) {
        throw new Error(error.sqlMessage || error.message)
    }
}