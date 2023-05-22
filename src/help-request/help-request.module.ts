import { Module } from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { HelpRequestController } from './help-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelpRequest } from './entities/help-request.entity';
import { SolvedHelpRequest } from './entities/solved-help-request.entity';
import { SolvedHelpRequestsController } from './solved-help-requests.controller';

@Module({
  controllers: [HelpRequestController, SolvedHelpRequestsController],
  providers: [HelpRequestService],
  imports: [TypeOrmModule.forFeature([HelpRequest, SolvedHelpRequest])],
})
export class HelpRequestModule {}
