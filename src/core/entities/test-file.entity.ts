export class TestFile {
    constructor(
        public name: string | undefined,
        public request: object,
        public folders: string[],
        public test: string,
        public result: string,
    ) { }
}
