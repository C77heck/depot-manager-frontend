/**
 * eases up to use the session and the local storage in code.
 * abstracts away the JSON usage
 */

export class Storage {
    public name: string;
    public storage = window.localStorage;

    public constructor(name: string, type: string = 'local') {
        this.name = name;
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
    }

    public has() {
        return !!this.storage.getItem(this.name);
    }

    public set(value: any) {
        this.storage.setItem(this.name, JSON.stringify(value, null));
    }

    public get() {
        const val = this.storage.getItem(this.name);

        return !!val ? JSON.parse(val) : false;
    }

    public remove() {
        this.storage.removeItem(this.name);
    }
}
