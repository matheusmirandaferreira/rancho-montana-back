import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Race } from '../models/Race';
import { fieldsErrors } from '../utils/fieldsErrors';

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

    nmrace = nmrace.trim();

    if (!nmrace)
      return new Error('Informe um nome válido', {
        cause: fieldsErrors({ nmrace }),
      });

    if (await repo.findOneBy({ nmrace }))
      return new Error('Raça já cadastrado!');

    const pace = repo.create({ nmrace });

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async list() {
    const paces = await repo.find();

    return Object({ status: '00', data: paces });
  }

  async edit(props: EditProps) {
    const { uuid: uuidrace, nmrace } = props;

    if (!uuidrace) return new Error('Informe um uuid válido');

    if (!nmrace)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ nmrace }),
      });

    const pace = await repo.findOneBy({ uuidrace });

    if (!pace) return new Error('Raça não encontrado');

    pace.nmrace = nmrace;

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async delete({ uuid: uuidrace }: Pick<EditProps, 'uuid'>) {
    if (!uuidrace) return new Error('Informe um uuid válido');

    const pace = await repo.findOneBy({ uuidrace });

    if (!pace) return new Error('Raça não encontrado');

    await repo.remove(pace);

    return Object({ status: '00' });
  }
}
