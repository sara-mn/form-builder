import { Injectable } from '@angular/core';
import { RegisterUseCase } from '@application/user/register.use.case';
import { RegisterRequest } from '@app/domain';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(private registerUseCase: RegisterUseCase) {
  }

  register(data: RegisterRequest): Promise<boolean> {
    return this.registerUseCase.execute(data);
  }
}
