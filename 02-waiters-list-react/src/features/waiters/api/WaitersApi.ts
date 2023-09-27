import {Waiter} from "../type";

const URL = 'http://localhost:4000/waiters/';

export class WaitersApi {
  static getList(): Promise<Waiter[]> {
    return fetch(URL).then(response => response.json())
  }

  static create(waiter: Waiter): Promise<Waiter> {
    return fetch(URL, {
      method: 'POST',
      body: JSON.stringify(waiter),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
  }
}
