import { Module } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from "./file/file.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    TrackModule,
    FileModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.t4rhtog.mongodb.net/?retryWrites=true&w=majority'),
  ]
})
export class AppModule { }