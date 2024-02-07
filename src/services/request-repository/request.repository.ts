import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { Folder, Test } from "./dtos";
import { TestFile } from "src/core";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RequestRepository {

    constructor(private readonly configService: ConfigService) { }


    public async fetch(): Promise<TestFile[]> {
        const postman_collection = readFileSync(this.configService.get<string>('postman_collection'), "utf8");

        const data = JSON.parse(readFileSync(postman_collection, "utf8"));

        const requests = this.getRequests(data);
        return requests;
    }

    private getRequests(item: Folder | Test) {
        item.folders = item.folders ?? [];

        if (Folder.is(item)) {
            return item.item.flatMap((i: any) =>
                this.getRequests({ ...i, folders: [...item.folders, item.name] }),
            );
        } else if (Test.is(item)) {
            return this.mapTest(item);
        }
    }

    private mapTest(request: Test): TestFile {
        const test = request.event?.find((e: any) => e.listen === "test");
        return new TestFile(
            request.name
                .replaceAll(" ", "_")
                .replaceAll("-", "")
                .replaceAll("__", "_")
                .toLowerCase(),
            request.request,
            request.folders.map((f) =>
                f
                    .replaceAll(" ", "_")
                    .replaceAll("-", "")
                    .replaceAll("__", "_")
                    .toLowerCase(),
            ),
            (test as any)?.script.exec.join("\r\n"),
            undefined,
        );
    }
}
