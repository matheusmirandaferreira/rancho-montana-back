import { validate } from 'uuid';
import { AppDataSource } from '../data-source';
import { Color } from '../models/Color';
import { fieldsErrors } from '../utils/fieldsErrors';
import { normalizeDiacritics, normalizeWhiteSpaces } from 'normalize-text';

type EditProps = {
  uuid: string;
  nmcolor: string;
};

const repo = AppDataSource.getRepository(Color);

export class ColorRepository {
  async getColor({ uuidcolor }: Pick<Color, 'uuidcolor'>) {
    if (!validate(uuidcolor)) return new Error('Informe um uuid válido');

    const horse = await repo.findOneBy({ uuidcolor });

    if (!horse) return new Error('Cor não encontrado');

    return Object({ status: '00', data: horse });
  }

  async create(props: Partial<Color>) {
    let { nmcolor } = props;

    nmcolor = normalizeWhiteSpaces(nmcolor);

    if (!nmcolor)
      return new Error('Informe um nome válido', {
        cause: fieldsErrors({ nmcolor }),
      });

    if (await repo.findOneBy({ nmcolor }))
      return new Error('Cor já cadastrada!');

    const permalink = normalizeDiacritics(nmcolor)
      .toLowerCase()
      .replaceAll(' ', '_');

    if (await repo.findOneBy({ color_permalink: permalink }))
      return new Error('Cor já cadastrada!');

    const color = repo.create({ nmcolor, color_permalink: permalink });

    await repo.save(color);

    return Object({ status: '00', data: color });
  }

  async list() {
    const colors = await repo.find();

    return Object({ status: '00', data: colors });
  }

  async edit(props: EditProps) {
    const { uuid: uuidcolor, nmcolor } = props;

    if (!uuidcolor) return new Error('Informe um uuid válido');

    if (!nmcolor)
      return new Error('Erro de validação', {
        cause: fieldsErrors({ nmcolor }),
      });

    const color = await repo.findOneBy({ uuidcolor });

    if (!color) return new Error('Cor não encontrada');

    const permalink = normalizeDiacritics(nmcolor)
      .toLowerCase()
      .replaceAll(' ', '_');

    if (!(await repo.findOneBy({ color_permalink: permalink })))
      return new Error('Cor não encontrada!');

    color.nmcolor = nmcolor;
    color.color_permalink = permalink;

    await repo.save(color);

    return Object({ status: '00', data: color });
  }

  async delete({ uuid: uuidcolor }: Pick<EditProps, 'uuid'>) {
    if (!uuidcolor) return new Error('Informe um uuid válido');

    const color = await repo.findOneBy({ uuidcolor });

    if (!color) return new Error('Cor não encontrada');

    await repo.remove(color);

    return Object({ status: '00' });
  }
}
