import { Global, Module } from "@nestjs/common";
import { databaseProvider } from './databas.provider';
import { ConfigModule } from "@nestjs/config";

@Global()
@Module({
  imports: [ ConfigModule],
  providers: [databaseProvider],
  exports: [databaseProvider]
})
export class DatabaseModule {}
