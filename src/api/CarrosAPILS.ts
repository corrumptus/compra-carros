import Carro from "../model/Carro";

export default class CarrosAPILS implements API<number, "id", Carro> {
    private LOCAL_STORAGE_KEY = "carros_local_storage";

    constructor() {
        if (localStorage.getItem(this.LOCAL_STORAGE_KEY) === undefined)
            localStorage.setItem(this.LOCAL_STORAGE_KEY, "");
    }

    getAll(): Carro[] {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) as string);
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