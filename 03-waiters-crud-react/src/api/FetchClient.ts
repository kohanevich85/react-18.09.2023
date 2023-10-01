export class FetchClient<T> {
  url: string

  constructor(url: string) {
    this.url = url
  }

  request(path = '', method = 'GET', data?: T): Promise<any> {
    return fetch(`${this.url}${path}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
  }

  getList(): Promise<T[]> {
    return this.request()
  }

  create(data: T): Promise<T> {
    return this.request('', 'POST', data)
  }

  update(id: number, data: T): Promise<T> {
    return this.request(String(id), 'PUT', data)
  }

  delete(id: number): Promise<void> {
    return this.request(String(id), 'DELETE')
  }
}