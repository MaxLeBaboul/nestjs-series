import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeeModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 50,
      },
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
