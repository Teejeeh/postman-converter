import { Command, CommandRunner } from "nest-commander";
import { RequestRepository, TemplateService, ExporterService } from "../services";

@Command({
  name: "converter",
  arguments: "",
  options: { isDefault: true },
})
export class TaskRunner extends CommandRunner {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly templateService: TemplateService,
    private readonly exporterService: ExporterService) {
    super();
  }

  async run(): Promise<void> {
    const requests = await this.requestRepository.fetch();
    const filledTemplate = await this.templateService.fillRequests(requests);
    await this.exporterService.export(filledTemplate);
  }
}
