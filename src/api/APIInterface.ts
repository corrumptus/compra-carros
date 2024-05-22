interface API<K, K_NAME extends string, V> {
    getAll(): V[];

    get(key: K): V  | undefined;

    create(create: Omit<V, K_NAME>): V | undefined;

    update(update: V): V | undefined;

    delete(key: K): boolean;
}