import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getUser() {
    const userData = await Plugins.Storage.get({key: environment.storageUser});
    return JSON.parse(userData.value);
  }

  async getCredentials() {
    const userData = await Plugins.Storage.get({key: environment.storageAuth});
    return  JSON.parse(userData.value)['lessonPlans'];
  }

}
