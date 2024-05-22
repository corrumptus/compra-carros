import Carro from "../model/Carro";

export default class CarrosAPILS implements API<number, "id", Carro> {
    getAll(): Carro[] {
        throw new Error("Method not implemented.");
    }

    get(key: number): Carro | undefined {
        throw new Error("Method not implemented.");
    }

    create(create: Omit<Carro, "id">): Carro | undefined {
        throw new Error("Method not implemented.");
    }

    update(update: Carro): Carro | undefined {
        throw new Error("Method not implemented.");
    }

    delete(key: number): boolean {
        throw new Error("Method not implemented.");
    }
}