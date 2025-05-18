import { Injectable } from '@angular/core';
import { UserUseCase } from '@application/user.use.case';
import { RegisterRequest } from '@app/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {

  constructor(private registerUseCase: UserUseCase) {
  }

  register(data: RegisterRequest): Observable<boolean> {
    return this.registerUseCase.register(data);
  }
}
