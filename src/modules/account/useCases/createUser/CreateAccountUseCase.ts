import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
interface CreateAccountUseCaseProps {
  email: string;
  name: string;
  password: string;
}

export class CreateAccountUseCase {
  async execute({ email, name, password }: CreateAccountUseCaseProps) {
    const acountExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (acountExists) {
        throw new Error("Account already exists");
    }
    const hashPassword = await hash(password, 10);

    const account = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return account;
  }
}
