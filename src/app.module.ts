import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { TaskRunner } from "./controllers/app.command";
import { RequestRepository, ExporterService, TemplateService } from "./services";

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true,
  }),],
  controllers: [TaskRunner],
  providers: [TaskRunner, RequestRepository, TemplateService, ExporterService],
})
export class AppModule { }
