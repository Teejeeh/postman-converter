import { Injectable } from "@nestjs/common";
import { rm } from "fs/promises";
import { mkdirSync, writeFileSync } from "fs";
import { TestFile } from "src/core";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ExporterService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    public async export(requests): Promise<void> {
        const export_folder = this.configService.get<string>('export_folder');

        // Remove export folder
        await rm("export_folder", { recursive: true, force: true });

        requests.forEach((request: TestFile) => {
            const folders = request.folders.join("/").toLocaleLowerCase();
            mkdirSync(`${export_folder}/${folders}`, { recursive: true });
            writeFileSync(
                `${export_folder}/${folders}/${request.name}.cy.ts`,
                request.result
            );
        });
    }
}
