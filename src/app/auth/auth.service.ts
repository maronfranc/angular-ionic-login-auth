import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

import { User } from './user.model';

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


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private _user = new BehaviorSubject<User>(null);

    get userIsAuthenticated() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return !!user.token;
                } else {
                    return false;
                }
            })
        );
    }

    get userId() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return user.credentials.id;
                } else {
                    return null;
                }
            })
        );
    }

    get token() {
        return this._user.asObservable().pipe(
            map(user => {
                if (user) {
                    return user.token;
                } else {
                    return null;
                }
            })
        );
    }

    get user() {
        return this._user;
    }
    constructor(private http: HttpClient) {}

    // Pega valor no local storage repassa para _user e retorna booleano para auth.guard.ts
    autoLogin() {
        return from(Plugins.Storage.get({ key: 'authData' })).pipe(
            map(storedData => {
                if (!storedData || !storedData.value) {
                    return null;
                }
                const parsedData = JSON.parse(storedData.value) as {
                    credentials: Credentials,
                    refreshToken: string,
                    token: string,
                    lessonPlans: Array<any[]>;
                };
                const user = new User(
                    parsedData.credentials,
                    parsedData.refreshToken,
                    parsedData.token,
                    parsedData.lessonPlans
                );
                return user;
            }),
            tap(user => {
                if (user) {
                    this._user.next(user);
                }
            }),
            map(user => {
                return !!user;
            })
        );
    }


    login(email: string, password: string) {
        return this.http
        .post(
          `https://dev-api.prodigioeducacao.com/v1/token`,
          { email, password }
        )
        .pipe(tap(this.setUserData.bind(this)));
    }

    logout() {
        this._user.next(null);
        Plugins.Storage.remove({ key: 'authData' });
    }

    ngOnDestroy() {}


    private setUserData(userData: AuthResponseData) {
        const user = new User(
            userData.credentials,
            userData.refreshToken,
            userData.token,
            userData.lessonPlans
        );
        this._user.next(user);
        this.storeAuthData(
            userData.credentials,
            userData.lessonPlans,
            userData.refreshToken,
            userData.token
        );
    }

    private storeAuthData(
        credentials: string,
        lessonPlans: Array<any[]>,
        refreshToken: string,
        token: string
    ) {
    const data = JSON.stringify({
        credentials,
        lessonPlans,
        refreshToken,
        token
    });
    Plugins.Storage.set({ key: 'authData', value: data });
    }
}
