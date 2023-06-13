import { AppDataSource } from '../data-source';
import { Color } from '../models/Color';
import { fieldsErrors } from '../utils/fieldsErrors';

type EditProps = {
  uuid: string;
  nmcolor: string;
};

const repo = AppDataSource.getRepository(Color);

export class ColorRepository {
  async create(props: Partial<Color>) {
    let { nmcolor } = props;

    nmcolor = nmcolor.trim();

    if (!nmcolor)
      return new Error('Informe um nome válido', {
        cause: fieldsErrors({ nmcolor }),
      });

    if (await repo.findOneBy({ nmcolor }))
      return new Error('Andamento já cadastrado!');

    const pace = repo.create({ nmcolor });

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async list() {
    const paces = await repo.find();

    return Object({ status: '00', data: paces });
  }

  async edit(props: EditProps) {
    const { uuid: uuidcolor, nmcolor } = props;

    if (!uuidcolor) return new Error('Informe um uuid válido');

    if (!nmcolor)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ nmcolor }),
      });

    const pace = await repo.findOneBy({ uuidcolor });

    if (!pace) return new Error('Cor não encontrada');

    pace.nmcolor = nmcolor;

    await repo.save(pace);

    return Object({ status: '00', data: pace });
  }

  async delete({ uuid: uuidcolor }: Pick<EditProps, 'uuid'>) {
    if (!uuidcolor) return new Error('Informe um uuid válido');

    const pace = await repo.findOneBy({ uuidcolor });

    if (!pace) return new Error('Cor não encontrada');

    await repo.remove(pace);

    return Object({ status: '00' });
  }
}
