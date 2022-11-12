import { compare } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface AuthenticateAccountUseCaseProps {
  email: string;
  password: string;
}

export class AuthenticateAccountUseCase {
  async execute({ email, password }: AuthenticateAccountUseCaseProps) {
    const verifyAccount = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const name = verifyAccount?.name;
    if (!verifyAccount) {
      throw new Error("Account doesn't exists");
    }
    const passwordMatch = await compare(password, verifyAccount.password);
    if (!passwordMatch) {
      throw new Error("Password invalid");
    }
    const token = sign({ email }, verifyAccount.password, {
      subject: verifyAccount.email,
      expiresIn: "1d",
    });
    return {
      token,
      name,
    };
  }
}
