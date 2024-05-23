import Carro from "../model/Carro";

export default class CarrosAPILS implements API<number, "id", Carro> {
    private LOCAL_STORAGE_KEY = "carros_local_storage";
    private nextId;

    constructor() {
        if (localStorage.getItem(this.LOCAL_STORAGE_KEY) === undefined) {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, "");
            this.nextId = 1;
        } else {
            const carros = this.getAll();

            const lastCarro = carros[carros.length - 1];

            this.nextId = lastCarro.id + 1;
        }
    }

    getAll(): Carro[] {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) as string);
    }

    get(key: number): Carro | undefined {
        return this.getAll().find(carro => carro.id === key);
    }

    create(create: Omit<Carro, "id">): Carro | undefined {
        throw new Error("Method not implemented.");
    }

    update(update: Carro): Carro | undefined {
        throw new Error("Method not implemented.");
    }

    delete(key: number): boolean {
        const carros = this.getAll();

        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(carros.filter(carro => carro.id === key)));

        return true;
    }

    private verificaCarro(carro: Partial<Carro>, carros: Carro[], isEditing: boolean): boolean {
        if (
            carro.modelo === undefined ||
            carro.fabricante === undefined ||
            carro.ano === undefined ||
            carro.potencia === undefined ||
            carro.preco === undefined ||
            carro.numeroSerie === undefined
        )
            return false;

        if (!isEditing && carro.id !== undefined)
            return false;

        if (isEditing && carro.id === undefined)
            return false;

        if (!this.isString(carro.modelo))
            return false;

        if (!this.isString(carro.fabricante))
            return false;

        if (!this.isNumber(carro.ano))
            return false;

        if (!this.isNumber(carro.potencia))
            return false;

        if (!this.isNumber(carro.preco))
            return false;

        if (!this.isNumber(carro.numeroSerie))
            return false;

        if (!isEditing && carros.find(c => c.numeroSerie === carro.numeroSerie) !== undefined)
            return false;

        if (isEditing && carros.find(c => c.id === carro.id) === undefined)
            return false;

        return true;
    }

    private isString(value: string): value is string {
        return value !== null && typeof value === "string";
    }

    private isNumber(value: any): value is number {
        return value !== null && typeof value === "number" && !isNaN(value);
    }
}