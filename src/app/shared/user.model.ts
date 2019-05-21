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

export interface AuthResponseData {
  credentials: any;
  lessonPlans: any;
  refreshToken: string;
  token: any;
}

export class Credentials {
  constructor(
      public id: number,
      public email: string,
      private name: string,
      private slug?: string
  ) {}
}
