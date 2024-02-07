export class TestRequest {
    constructor(
        public method: string,
        public header: object,
        public path: string[],
        public query: object[],
    ) { }
}
