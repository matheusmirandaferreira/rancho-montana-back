import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Race } from '../models/Race';
import { fieldsErrors } from '../utils/fieldsErrors';
import { normalizeDiacritics, normalizeWhiteSpaces } from 'normalize-text';

type EditProps = {
  uuid: string;
  nmrace: string;
};

const repo = AppDataSource.getRepository(Race);

export class RaceRepository {
  async getRace({ uuidrace }: Pick<Race, 'uuidrace'>) {
    if (!validate(uuidrace)) return new Error('Informe um uuid válido');

    const horse = await repo.findOneBy({ uuidrace });

    if (!horse) return new Error('Raça não encontrado');

    return Object({ status: '00', data: horse });
  }

  async create(props: Partial<Race>) {
    let { nmrace } = props;

    nmrace = normalizeWhiteSpaces(nmrace);

    if (!nmrace)
      return new Error('Informe um nome válido', {
        cause: fieldsErrors({ nmrace }),
      });

    if (await repo.findOneBy({ nmrace }))
      return new Error('Raça já cadastrado!');

    const permalink = normalizeDiacritics(nmrace)
      .toLowerCase()
      .replaceAll(' ', '_');

    if (await repo.findOneBy({ race_permalink: permalink }))
      return new Error('Raça já cadastrada!');

    const race = repo.create({ nmrace, race_permalink: permalink });

    await repo.save(race);

    return Object({ status: '00', data: race });
  }

  async list() {
    const races = await repo.find();

    return Object({ status: '00', data: races });
  }

  async edit(props: EditProps) {
    const { uuid: uuidrace, nmrace } = props;

    if (!uuidrace) return new Error('Informe um uuid válido');

    if (!nmrace)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ nmrace }),
      });

    const race = await repo.findOneBy({ uuidrace });

    if (!race) return new Error('Raça não encontrada!');

    const permalink = normalizeDiacritics(nmrace)
      .toLowerCase()
      .replaceAll(' ', '_');

    if (await repo.findOneBy({ race_permalink: permalink }))
      return new Error('Raça já existe!');

    race.nmrace = nmrace;
    race.race_permalink = permalink;

    await repo.save(race);

    return Object({ status: '00', data: race });
  }

  async delete({ uuid: uuidrace }: Pick<EditProps, 'uuid'>) {
    if (!uuidrace) return new Error('Informe um uuid válido');

    const race = await repo.findOneBy({ uuidrace });

    if (!race) return new Error('Raça não encontrada!');

    await repo.remove(race);

    return Object({ status: '00' });
  }
}
