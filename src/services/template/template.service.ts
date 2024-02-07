import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { readFileSync } from "fs";
import { TestFile } from "src/core";

@Injectable()
export class TemplateService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    public async fillRequests(requests): Promise<TestFile[]> {
        const template = readFileSync(this.configService.get<string>('cypress_template'), "utf8");

        return requests.map((request: TestFile): TestFile => {
            request.result = this.fillTemplate(template, request);
            return request;
        });
    }

    private fillTemplate(template, { name, test, request }): string {
        const { method, url } = request;
        const paths = url.path;
        const lastPath = paths?.length > 0 ? url[paths.length - 1] : ""
        const raw_url = url?.raw?.replaceAll("{{", "${").replaceAll("}}", "}") ?? '';

        return template
            .replaceAll("$name", name)
            .replaceAll("$test", test)
            .replaceAll("$method", method)
            .replaceAll("$url", lastPath)
            .replaceAll("$raw_url", raw_url)
            .replaceAll("GlobalFunctions.successRequest();", "")
            .replaceAll(
                RegExp(/GlobalFunctions\.(.+)\(([^\)]+)\)/g),
                "GlobalFunctions.$1($2, response.body)",
            );
    }
}
