import db from '../db/connection.ts'
import { logError } from '../utils/logger.ts'

export default class Customer {
  private firstName: string
  private lastName: string
  private email: string
  private points: number

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    points: number
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.points = points
  }

  async save(): Promise<any> {
    const query = `
    insert into customers(first_name, last_name, email, points)
    values ('${this.firstName}','${this.lastName}','${this.email}','${this.points}')`

    try {
      return await db.execute(query)
    } catch (error) {
      logError('Customer.save', error, {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        points: this.points
      })
      throw error
    }
  }

  static async find(id?: number): Promise<any> {
    const query = `
    select * from customers ${id ? `where id = ${id}` : ''}`

    try {
      return await db.execute(query)
    } catch (error) {
      logError('Customer.find', error, { id })
      throw error
    }
  }

  async update(id: number): Promise<any> {
    const setStatement = `
    ${this.firstName ? `first_name = '${this.firstName}',` : ``}
    ${this.lastName ? `last_name = '${this.lastName}',` : ``}
    ${this.email ? `email = '${this.email}',` : ``}
    ${this.points ? `points = '${this.points}'` : ``}
    `
      .trim()
      .replace(/,$/, '')
    const query = `
    update customers set 
    ${setStatement}
    where id = ${id}`

    try {
      return await db.execute(query)
    } catch (error) {
      logError('Customer.update', error, {
        id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        points: this.points
      })
      throw error
    }
  }

  static async delete(id: number): Promise<any> {
    const query = `
    delete from customers 
    where id = ${id}`

    try {
      return await db.execute(query)
    } catch (error) {
      logError('Customer.delete', error, { id })
      throw error
    }
  }
}
