import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Pace } from '../models/Pace';
import { fieldsErrors } from '../utils/fieldsErrors';
import { normalizeDiacritics, normalizeWhiteSpaces } from 'normalize-text';

type EditProps = {
  uuid: string;
  nmpace: string;
};

const repo = AppDataSource.getRepository(Pace);

export class PaceRepository {
  async getPace({ uuidpace }: Pick<Pace, 'uuidpace'>) {
    if (!validate(uuidpace)) return new Error('Informe um uuid válido');

    const pace = await repo.findOneBy({ uuidpace });

    if (!pace) return new Error('Andamento não encontrado');

    return Object({ status: '00', data: pace });
  }

  async create(props: Partial<Pace>) {
    let { nmpace } = props;

    nmpace = normalizeWhiteSpaces(nmpace);

    if (!nmpace)
      return new Error('Informe um nome válido', {
        cause: fieldsErrors({ nmpace }),
      });

    if (await repo.findOneBy({ nmpace }))
      return new Error('Andamento já cadastrado!');

    const permalink = normalizeDiacritics(nmpace)
      .toLowerCase()
      .replaceAll(' ', '_');

    if (await repo.findOneBy({ pace_permalink: permalink }))
      return new Error('Andamento já cadastrado!');

    const pace = repo.create({ nmpace });

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async list() {
    const paces = await repo.find();

    return Object({ status: '00', data: paces });
  }

  async edit(props: EditProps) {
    const { uuid: uuidpace, nmpace } = props;

    if (!uuidpace) return new Error('Informe um uuid válido');

    if (!nmpace)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ nmpace }),
      });

    const pace = await repo.findOneBy({ uuidpace });

    if (!pace) return new Error('Andamento não encontrado');

    pace.nmpace = nmpace;

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async delete({ uuid: uuidpace }: Pick<EditProps, 'uuid'>) {
    if (!uuidpace) return new Error('Informe um uuid válido');

    const pace = await repo.findOneBy({ uuidpace });

    if (!pace) return new Error('Andamento não encontrado');

    await repo.remove(pace);

    return Object({ status: '00' });
  }
}
