import {World} from "./world.js";

export function connect(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        let cx = indexedDB.open("com.piesku.duszki", 1);
        cx.onupgradeneeded = () => cx.result.createObjectStore("world", {keyPath: "id"});
        cx.onsuccess = () => resolve(cx.result);
        cx.onerror = () => reject(cx.error);
    });
}

export function put(db: IDBDatabase, world: World): Promise<IDBValidKey> {
    return new Promise((resolve, reject) => {
        let store = db.transaction("world", "readwrite").objectStore("world");
        let req = store.put(world);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function get(db: IDBDatabase, id: number): Promise<IDBRequest<World | undefined>> {
    return new Promise((resolve, reject) => {
        let store = db.transaction("world", "readonly").objectStore("world");
        let req = store.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function clear(db: IDBDatabase): Promise<undefined> {
    return new Promise((resolve, reject) => {
        let store = db.transaction("world", "readonly").objectStore("world");
        let req = store.clear();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}
