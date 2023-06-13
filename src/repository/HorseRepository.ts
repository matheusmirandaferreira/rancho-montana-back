import { AppDataSource } from '../data-source';
import { Horse } from '../models/Horse';
import { fieldsErrors } from '../utils/fieldsErrors';

type CreateHorseParams = {
  uuidcolor: string;
  uuidrace: string;
  uuidpace: string;
  nmhorse: string;
  birthdate: string;
};

const repo = AppDataSource.getRepository(Horse);

export class HorseRepository {
  async create(props: CreateHorseParams) {
    const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace } = props;

    if (Object.values(props).some((i) => !i))
      return new Error('Preencha todos os campos', {
        cause: fieldsErrors(props),
      });
  }
}
