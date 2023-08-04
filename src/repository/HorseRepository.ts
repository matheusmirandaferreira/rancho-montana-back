import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Color } from '../models/Color';
import { Horse } from '../models/Horse';
import { Pace } from '../models/Pace';
import { Race } from '../models/Race';
import { fieldsErrors } from '../utils/fieldsErrors';
import { uploadsMiddleware } from '../middleware/uploadMiddleware';
import { Category } from '../models/Category';

type CreateHorseParams = {
  uuidcolor: string;
  uuidrace: string;
  uuidpace: string;
  uuidcategory: string;
  nmhorse: string;
  birthdate: string;
  description: string;
  gender: 'M' | 'F';
};

const repo = AppDataSource.getRepository(Horse);

const upload = uploadsMiddleware.single('image');

export class HorseRepository {
  async uploadImage({ req, res, controller }) {
    upload(req, res, controller);
  }

  async getHorse({ uuidhorse }: Pick<Horse, 'uuidhorse'>) {
    if (!validate(uuidhorse)) return new Error('Informe um uuid válido');

    const horse = await repo.find({
      relations: { color: true, pace: true, race: true, category: true },
      where: { uuidhorse },
    });

    if (!horse.length) return new Error('Cavalo não encontrado');

    return Object({ status: '00', data: horse[0] });
  }

  async list() {
    const data = await repo.find({
      relations: { color: true, pace: true, race: true, category: true },
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
      uuidcategory,
      gender,
    } = props;

    if (!validate(uuidhorse)) return new Error('Informe um uuid válido');

    const horse = await repo.findOneBy({ uuidhorse });

    if (!horse) return new Error('Cavalo não encontrado');

    if (birthdate)
      horse.birthdate = new Date(
        birthdate.split('/').reverse().join('-')
      ).toISOString();

    const color = await AppDataSource.createQueryBuilder(Color, 'color')
      .select()
      .where('color.uuidcolor = :uuidcolor', { uuidcolor })
      .getOne()
      .catch(() => null);

    const pace = await AppDataSource.createQueryBuilder(Pace, 'pace')
      .select()
      .where('pace.uuidpace = :uuidpace', { uuidpace })
      .getOne()
      .catch(() => null);

    const race = await AppDataSource.createQueryBuilder(Race, 'race')
      .select()
      .where('race.uuidrace = :uuidrace', { uuidrace })
      .getOne()
      .catch(() => null);

    const category = await AppDataSource.createQueryBuilder(
      Category,
      'category'
    )
      .select()
      .where('category.uuidcategory = :uuidcategory', { uuidcategory })
      .getOne()
      .catch(() => null);

    if (!color || !race || !pace || !category)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ color, race, pace, category }, 'UUID inválido'),
      });

    if (uuidcolor) horse.uuidcolor = uuidcolor;

    if (uuidpace) horse.uuidpace = uuidpace;

    if (uuidrace) horse.uuidrace = uuidrace;

    if (uuidcategory) horse.uuidcategory = uuidcategory;

    if (nmhorse) horse.nmhorse = nmhorse;

    if (gender)
      if (gender !== 'M' && gender !== 'F')
        return new Error('Erro de validação', {
          cause: { gender: "O genêro deve ser 'M' ou 'F'" },
        });
      else horse.gender = gender;

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
    const {
      birthdate,
      nmhorse,
      uuidcolor,
      uuidpace,
      uuidrace,
      description,
      gender,
      uuidcategory,
    } = props;

    if (Object.values(props).some((i) => !i))
      return new Error('Preencha todos os campos', {
        cause: fieldsErrors(props),
      });

    const color = await AppDataSource.createQueryBuilder(Color, 'color')
      .select()
      .where('color.uuidcolor = :uuidcolor', { uuidcolor })
      .getOne()
      .catch(() => null);

    const pace = await AppDataSource.createQueryBuilder(Pace, 'pace')
      .select()
      .where('pace.uuidpace = :uuidpace', { uuidpace })
      .getOne()
      .catch(() => null);

    const race = await AppDataSource.createQueryBuilder(Race, 'race')
      .select()
      .where('race.uuidrace = :uuidrace', { uuidrace })
      .getOne()
      .catch(() => null);

    const category = await AppDataSource.createQueryBuilder(
      Category,
      'category'
    )
      .select()
      .where('category.uuidcategory = :uuidcategory', { uuidcategory })
      .getOne()
      .catch(() => null);

    if (!color || !race || !pace || !category)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ color, race, pace, category }, 'UUID inválido'),
      });

    if (gender !== 'M' && gender !== 'F')
      return new Error('Erro de validação', {
        cause: { gender: "O genêro deve ser 'M' ou 'F'" },
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
      uuidcategory,
      gender,
    });

    await repo.save(horse);

    return Object({ status: '00', data: horse });
  }
}
