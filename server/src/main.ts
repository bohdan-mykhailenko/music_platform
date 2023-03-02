import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const start = async () => {
  try {
    const PORT = process.env.PORT || 7000
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(PORT, () => console.log('Everything is OK'))
  } catch (error) {
    console.log(error + '')
  }
}

start()
