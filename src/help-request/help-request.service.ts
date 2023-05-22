import { Injectable } from '@nestjs/common';
import { CreateHelpRequestDto } from './dto/create-help-request.dto';
import { Repository } from 'typeorm';
import { HelpRequest } from './entities/help-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SolvedHelpRequest } from './entities/solved-help-request.entity';
import { SolveHelpRequestDto } from './dto/solve-help-request.dto';

@Injectable()
export class HelpRequestService {
  constructor(
    @InjectRepository(HelpRequest) private helpReqRepo: Repository<HelpRequest>,
    @InjectRepository(SolvedHelpRequest)
    private solvedHelpReqRepo: Repository<SolvedHelpRequest>,
  ) {}

  create(createHelpRequestDto: CreateHelpRequestDto) {
    const newReq = this.helpReqRepo.create(createHelpRequestDto);
    return this.helpReqRepo.save(newReq);
  }

  delete(id: number) {
    return this.helpReqRepo.delete(id);
  }

  findAllHelpRequests() {
    return this.helpReqRepo.find({
      relations: {
        applicant: {
          class: true,
        },
      },
    });
  }

  findOneHelpRequest(id: number) {
    return this.helpReqRepo.findOne({
      where: { id },
      relations: {
        applicant: {
          class: true,
        },
      },
    });
  }

  async solveHelpRequest(solveHelpRequestDto: SolveHelpRequestDto) {
    console.log(solveHelpRequestDto);
    const user = await this.helpReqRepo.findOne({
      where: { id: solveHelpRequestDto.helpRequestId },
    });
    const solvedReq = this.solvedHelpReqRepo.create({
      ...solveHelpRequestDto,
      ...user,
    });
    return [
      await this.solvedHelpReqRepo.save(solvedReq),
      await this.helpReqRepo.delete(user),
    ];
  }

  findAllSolvedHelpRequests() {
    return this.solvedHelpReqRepo.find({
      relations: {
        applicant: { class: true },
        mentor: { class: true },
        lesson: { subject: true },
      },
    });
  }

  findOneSolvedHelpRequest(id: number) {
    return this.solvedHelpReqRepo.findOne({
      where: { id },
      relations: {
        applicant: { class: true },
        mentor: { class: true },
        lesson: { subject: true },
      },
    });
  }
}
