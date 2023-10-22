import {delay} from '../utils'

export class FetchClient<T> {
    url: string
    delay: number = 500

    constructor(url: string) {
        this.url = url
    }

    async request<D>(path = '', method = 'GET', data?: T): Promise<D> {
        await delay(this.delay)

        const response = await fetch(`${this.url}${path}`, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            return response.json()
        }
        throw new Error(response.statusText)
    }

    async getList(): Promise<T[]> {
        try {
            return await this.request<T[]>()
        } catch (e: any) {
            throw Error(`Can't fetch list from server: ${e.message}`)
        }
    }

  async getOne(id: number): Promise<T> {
    try {
      return await this.request<T>(String(id))
    } catch (e: any) {
      throw Error(`Can't fetch one item from server: ${e.message}`)
    }
  }

    async create(data: T): Promise<T> {
        try {
            return await this.request<T>('', 'POST', data)
        } catch (e: any) {
            throw Error(`Can't create item on server: ${e.message}`)
        }
    }

    async update(id: number, data: T): Promise<T> {
        try {
            return await this.request<T>(String(id), 'PUT', data)
        } catch (e: any) {
            throw Error(`Can't update item on server: ${e.message}`)
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.request<void>(String(id), 'DELETE')
        } catch (e: any) {
            throw Error(`Can't delete item on server: ${e.message}`)
        }
    }
}
