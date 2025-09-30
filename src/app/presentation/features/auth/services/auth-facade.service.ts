import { Injectable } from '@angular/core';
import { LoginRequest, User } from '@app/domain';
import { LoginUseCase } from '@application/auth/login.use.case';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private loginUseCase: LoginUseCase) {
  }

  login(data: LoginRequest): Promise<User> {
    return this.loginUseCase.execute(data);
  }
  //
  // get isAuthenticated(){
  //   return this.
  // }
}
