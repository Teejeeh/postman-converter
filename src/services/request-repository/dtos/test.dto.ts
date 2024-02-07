import { TestRequest } from "./test-request";

export class Test {
    constructor(
        public name: string,
        public request: TestRequest,
        public event: object[],
        public folders?: string[],
    ) { }

    static is(item: object): item is Test {
        return (item as Test).request !== undefined;
    }
}
