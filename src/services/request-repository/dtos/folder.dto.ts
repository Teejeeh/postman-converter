export class Folder {
    constructor(
        public name: string,
        public item: object[],
        public folders?: string[],
    ) { }

    static is(item: object): item is Folder {
        return (item as Folder).item !== undefined;
    }
}
