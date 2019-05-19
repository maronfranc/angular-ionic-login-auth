import { Credentials } from './auth.service';

export class User {
  constructor(
    public credentials: Credentials,
    private _refreshToken: string,
    private _token: string,
    public lessonPlans?: Array<any[]>,
  ) {}

  get token() {
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}
