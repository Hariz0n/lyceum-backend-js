import { SubmoduleExpDto } from './submoduleExp.dto';

export class ModulesExpDto {
  id: number;
  name: string;
  subModules: SubmoduleExpDto[];
}
