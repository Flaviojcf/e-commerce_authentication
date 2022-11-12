import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createAccountUseCase = new CreateAccountUseCase();

    const result = await createAccountUseCase.execute({
      name,
      email,
      password,
    });
    return response.json(result);
  }
}
