export class UserAuth {
  constructor(
    public credentials: Credentials,
    private _refreshToken: string,
    private _token: string,
    public lessonPlans?: Array<any[]>,
  ) { }

  get token() {
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }
}

export interface AuthResponseData {
  credentials: Credentials;
  lessonPlans: any;
  refreshToken: string;
  token: any;
}

export interface Credentials {
  id: number;
  email: string;
  name: string;
  slug?: string;
}
