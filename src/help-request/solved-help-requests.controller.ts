import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';
import { SolveHelpRequestDto } from './dto/solve-help-request.dto';

@Controller('solved-help-requests')
export class SolvedHelpRequestsController {
  constructor(private readonly helpRequestService: HelpRequestService) {}

  @Roles(Role.student)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() solveHelpRequestDto: SolveHelpRequestDto) {
    return this.helpRequestService.solveHelpRequest(solveHelpRequestDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.helpRequestService.findAllSolvedHelpRequests();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpRequestService.findOneSolvedHelpRequest(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateHelpRequestDto: UpdateHelpRequestDto,
  // ) {
  //   return this.helpRequestService.update(+id, updateHelpRequestDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.helpRequestService.remove(+id);
  // }
}
