type Customer = {
  firstName: string
  lastName: string
  email: string
  points: number
}

import customersModel from '../models/customers.ts'
import { logError } from '../utils/logger.ts'

export const save = async (data: Customer): Promise<number | null> => {
  try {
    const { firstName, lastName, email, points } = data
    const customer = new customersModel(firstName, lastName, email, points)
    const [res] = await customer.save()
    return res.affectedRows ? res.insertId : null
  } catch (error) {
    logError('controller.save', error, { data })
    throw error
  }
}

export const find = async (id?: string): Promise<any> => {
  try {
    return await customersModel.find(id ? +id : undefined)
  } catch (error) {
    logError('controller.find', error, { id })
    throw error
  }
}

export const update = async (id: string, data: Customer): Promise<boolean> => {
  try {
    const { firstName, lastName, email, points } = data
    if (
      firstName == undefined &&
      lastName == undefined &&
      email == undefined &&
      points == undefined
    ) {
      return false
    }
    const customer = new customersModel(firstName, lastName, email, points)
    const [res] = await customer.update(+id)
    return res.affectedRows ? true : false
  } catch (error) {
    logError('controller.update', error, { id, data })
    throw error
  }
}

export const deleteById = async (id: string): Promise<any> => {
  try {
    const [res] = await customersModel.delete(+id)
    return res.affectedRows ? true : false
  } catch (error) {
    logError('controller.deleteById', error, { id })
    throw error
  }
}
