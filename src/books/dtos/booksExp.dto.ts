import { ModulesExpDto } from './modulesExp.dto';

export class BooksExpDto {
  id: number;
  name: string;
  year: number;
  modules: ModulesExpDto[];
}
