import { hash } from "bcrypt";
import { Request, Response } from "express";
import { AuthenticateAccountUseCase } from "./AuthenticateAccountUseCase";

export class AuthenticateAccountController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateAccountUseCaseProps = new AuthenticateAccountUseCase();

    const result = await authenticateAccountUseCaseProps.execute({
      email,
      password,
    });
    return response.json(result);
  }
}
