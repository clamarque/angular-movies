import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  save(key, data) {
    sessionStorage.setItem(key, this.getSettable(data));
  }

  read(key) {
    const value = sessionStorage.getItem(key);
    return this.getGettable(value);
  }

  remove(key) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }

  /**
 * private function settable or gettable data
 */

  private getSettable(value: any): string {
    const data = this.encode(typeof value === 'string' ? value : JSON.stringify(value));
    return data;
  }

  private getGettable(value: string): any {
    const data = this.decode(value);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  /**
 * private function to encrypt and decrypt data in local storage
 */
  private encode(value: string) {
    let encodedItem = btoa(value);
    encodedItem = encodedItem + '/d6mTWZon';
    return encodedItem;
  }

  private decode(value: string) {
    if (value) {
      let decodedItem = value.slice(0, -9);
      decodedItem = atob(decodedItem);
      return decodedItem;
    }
  }

}
