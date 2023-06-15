import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Color } from '../models/Color';
import { Horse } from '../models/Horse';
import { Pace } from '../models/Pace';
import { Race } from '../models/Race';
import { fieldsErrors } from '../utils/fieldsErrors';

type CreateHorseParams = {
  uuidcolor: string;
  uuidrace: string;
  uuidpace: string;
  nmhorse: string;
  birthdate: string;
  description: string;
};

const repo = AppDataSource.getRepository(Horse);

export class HorseRepository {
  async list() {
    const data = await repo.find({
      relations: { color: true, pace: true, race: true },
    });

    return Object({ status: '00', data });
  }

  async edit(props: Partial<Horse>) {
    const {
      birthdate,
      uuidhorse,
      uuidcolor,
      uuidpace,
      uuidrace,
      nmhorse,
      description,
    } = props;

    if (!validate(uuidhorse)) return new Error('Informe um uuid válido');

    const horse = await repo.findOneBy({ uuidhorse });

    if (!horse) return new Error('Cavalo não encontrado');

    if (birthdate)
      horse.birthdate = new Date(
        birthdate.split('/').reverse().join('-')
      ).toISOString();

    if (uuidcolor) horse.uuidcolor = uuidcolor;

    if (uuidpace) horse.uuidpace = uuidpace;

    if (uuidrace) horse.uuidrace = uuidrace;

    if (nmhorse) horse.nmhorse = nmhorse;

    if (description) horse.description = description;

    await repo.save(horse);

    return Object({ status: '00', data: horse.toJSON() });
  }

  async delete({ uuidhorse }: Pick<Horse, 'uuidhorse'>) {
    if (!uuidhorse)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ uuidhorse }),
      });

    const horse = await repo.findOneBy({ uuidhorse });

    if (!horse) return new Error('Cavalo não encontrado');

    await repo.remove(horse);

    return Object({ status: '00' });
  }

  async create(props: CreateHorseParams) {
    const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace, description } =
      props;

    if (Object.values(props).some((i) => !i))
      return new Error('Preencha todos os campos', {
        cause: fieldsErrors(props),
      });

    const color = await AppDataSource.createQueryBuilder(Color, 'color')
      .select()
      .where('color.uuidcolor = :uuidcolor', { uuidcolor })
      .getOne();

    const pace = await AppDataSource.createQueryBuilder(Pace, 'pace')
      .select()
      .where('pace.uuidpace = :uuidpace', { uuidpace })
      .getOne();

    const race = await AppDataSource.createQueryBuilder(Race, 'race')
      .select()
      .where('race.uuidrace = :uuidrace', { uuidrace })
      .getOne();

    if (!color || !race || !pace)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ color, race, pace }, 'UUID inválido'),
      });

    const horse = repo.create({
      birthdate: new Date(
        birthdate.split('/').reverse().join('-')
      ).toISOString(),
      nmhorse,
      uuidcolor,
      description,
      uuidpace,
      uuidrace,
    });

    await repo.save(horse);

    return Object({ status: '00', data: horse });
  }
}
