import bcrypt from 'bcryptjs';
import { validate } from 'uuid';
import jwt from 'jsonwebtoken';
import * as emailValidator from 'email-validator';

import { User } from '../models/User';
import { AppDataSource } from '../data-source';
import { fieldsErrors } from '../utils/fieldsErrors';

type LoginParams = {
  email: string;
  password: string | number;
};

type UserParams = {
  nmuser: string;
  email: string;
  password: string;
};

type EditUserParams = {
  nmuser: string;
  uuiduser: string;
  email: string;
  newpassword: string;
  oldpassword: string;
};

const repo = AppDataSource.getRepository(User);

export class UserRepository {
  async getUser({ uuiduser }: Pick<User, 'uuiduser'>) {
    if (!validate(uuiduser)) return new Error('Informe um uuid válido');

    const user = await repo.findOneBy({ uuiduser });

    if (!user) return new Error('Usuário não encontrado');

    return Object({ status: '00', data: user });
  }

  async login({ email, password }: LoginParams): Promise<Error | User> {
    if (!email || !password) {
      return new Error('Preencha todos os campos', {
        cause: fieldsErrors({ email, password }),
      });
    }

    const user = await repo.findOneBy({ email });

    if (!user) return new Error('Usuário não encontrado');

    if (!(await bcrypt.compare(String(password), user.password)))
      return new Error('Senha inválida');

    const token = jwt.sign({ id: user.uuiduser }, process.env.SECRET, {
      expiresIn: '7d',
    });

    return Object({ status: '00', data: { ...user, token } });
  }

  async createUser({
    nmuser,
    email,
    password,
  }: UserParams): Promise<Error | User> {
    if (!nmuser || !email || !password) {
      return new Error('Preencha todos os campos', {
        cause: fieldsErrors({ nmuser, email, password }),
      });
    }

    if (!emailValidator.validate(email)) {
      return new Error('Preencha os campos corretamente', {
        cause: { email: 'E-mail inválido' },
      });
    }

    if ((await repo.findBy({ email })).length > 0) {
      return new Error('Usuário já existe');
    }

    const user = repo.create({ nmuser, email, password });

    await repo.save(user);

    return Object({ status: '00', data: user });
  }

  async getUsers(): Promise<Error | User[]> {
    const users = await repo.find();

    return Object({
      status: '00',
      data: users,
    });
  }

  async editUser(props: Partial<EditUserParams>): Promise<Error | User> {
    const { email, nmuser, newpassword, oldpassword, uuiduser } = props;

    if (!validate(uuiduser)) return new Error('Informe um uuid válido');

    const user = await repo.findOneBy({ uuiduser });

    if (!user) return new Error('Usuário não existe');

    if (nmuser) user.nmuser = nmuser;

    if (email) user.email = email;

    if (newpassword && oldpassword) {
      if (!(await bcrypt.compare(String(oldpassword), user.password)))
        return new Error('Senha inválida');

      const salt = await bcrypt.genSalt(8);

      user.password = await bcrypt.hash(newpassword, salt);
    }

    if (newpassword && !oldpassword) {
      return new Error('Erro de validação', {
        cause: fieldsErrors({ oldpassword }),
      });
    }

    if (!newpassword && oldpassword) {
      return new Error('Erro de validação', {
        cause: fieldsErrors({ newpassword }),
      });
    }

    await repo.save(user);

    return Object({
      status: '00',
      data: { ...user.toJSON() },
    });
  }
}
