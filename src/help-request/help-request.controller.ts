import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HelpRequestService } from './help-request.service';
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/role.enum';

@Controller('help-request')
export class HelpRequestController {
  constructor(private readonly helpRequestService: HelpRequestService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(RolesGuard)
  @Roles(Role.student)
  @Post()
  create(@Body() createHelpRequestDto: CreateHelpRequestDto) {
    return this.helpRequestService.create(createHelpRequestDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.helpRequestService.findAllHelpRequests();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpRequestService.findOneHelpRequest(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateHelpRequestDto: UpdateHelpRequestDto,
  // ) {
  //   return this.helpRequestService.update(+id, updateHelpRequestDto);
  // }
  //
  @UseGuards(RolesGuard)
  @Roles(Role.student, Role.teacher)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpRequestService.delete(+id);
  }
}
