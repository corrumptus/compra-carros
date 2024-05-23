import Carro from "../model/Carro";

export default class CarrosAPILS implements API<number, "id", Carro> {
    private LOCAL_STORAGE_KEY = "carros_local_storage";
    private nextId;

    constructor() {
        if (localStorage.getItem(this.LOCAL_STORAGE_KEY) === null) {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, "[]");
            this.nextId = 1;
            return;
        }

        const carros = this.getAll();

        const lastCarro = carros[carros.length - 1];

        this.nextId = lastCarro === undefined ? 1 : lastCarro.id + 1;
    }

    getAll(): Carro[] {
        return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) as string);
    }

    get(key: number): Carro | undefined {
        return this.getAll().find(carro => carro.id === key);
    }

    create(create: Omit<Carro, "id">): Carro {
        const carros = this.getAll();

        this.verificaCarro(create, carros, false);

        const newCarro: Carro = {...create, id: this.nextId};

        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify([...carros, newCarro]));

        this.nextId++;

        return newCarro;
    }

    update(update: Carro): Carro {
        const carros = this.getAll();

        this.verificaCarro(update, carros, true);

        localStorage.setItem(
            this.LOCAL_STORAGE_KEY,
            JSON.stringify(carros.map(carro => carro.id === update.id ? update : carro))
        );

        return update;
    }

    delete(key: number): boolean {
        const carros = this.getAll();

        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(carros.filter(carro => carro.id !== key)));

        return true;
    }

    private verificaCarro(carro: Partial<Carro>, carros: Carro[], isEditing: boolean) {
        if (!isEditing && carro.id !== undefined)
            throw new Error("Id must be undefined");

        if (isEditing && carro.id === undefined)
            throw new Error("Id is missing");

        if (carro.modelo === undefined || !this.isString(carro.modelo))
            throw new Error("Modelo must be a valid string");

        if (carro.fabricante === undefined || !this.isString(carro.fabricante))
            throw new Error("Fabricante must be a valid string");

        if (carro.ano === undefined || !this.isNumber(carro.ano))
            throw new Error("Ano must be a valid number");

        if (carro.potencia === undefined || !this.isNumber(carro.potencia))
            throw new Error("Potencia must be a valid number");

        if (carro.preco === undefined || !this.isNumber(carro.preco))
            throw new Error("Preco must be a valid number");

        if (carro.numeroSerie === undefined || !this.isNumber(carro.numeroSerie))
            throw new Error("Numero de serie must be a valid number");

        if (
            carros.find(c => c.id !== carro.id && c.numeroSerie === carro.numeroSerie) !== undefined
        )
            throw new Error(`Car with the numero de serie ${carro.numeroSerie} already exists`);

        if (!isEditing && carros.find(c => c.numeroSerie === carro.numeroSerie) !== undefined)
            throw new Error("Numero de serie already exists");

        if (isEditing && carros.find(c => c.id === carro.id) === undefined)
            throw new Error(`Car with the id ${carro.id} not exists`);
    }

    private isString(value: string): value is string {
        return value !== null && typeof value === "string";
    }

    private isNumber(value: any): value is number {
        return value !== null && typeof value === "number" && !isNaN(value);
    }
}