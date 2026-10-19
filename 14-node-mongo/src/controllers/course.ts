import { NotFoundError, ValidationError } from '../errors.ts'
import type { Icourse } from '../interfaces/course.ts'
import type { ICourseRepository, SavedCourse } from '../interfaces/course-repository.ts'

// Knows nothing about HTTP or mongoose: gets plain data in, returns plain data out,
// and talks to storage only through ICourseRepository
export const createCourseController = (repository: ICourseRepository) => {
  const orNotFound = (course: SavedCourse | null, id: string) => {
    if (!course) throw new NotFoundError(`Course ${id} not found`)
    return course
  }

  return {
    async save(input: unknown): Promise<SavedCourse> {
      return repository.save(parseCourse(input))
    },

    async find(): Promise<SavedCourse[]> {
      return repository.find()
    },

    async findById(id: string): Promise<SavedCourse> {
      return orNotFound(await repository.findById(id), id)
    },

    async update(id: string, input: unknown): Promise<SavedCourse> {
      return orNotFound(await repository.update(id, parseCourseChanges(input)), id)
    },

    async delete(id: string): Promise<SavedCourse> {
      return orNotFound(await repository.delete(id), id)
    },
  }
}

const asObject = (input: unknown) => {
  if (typeof input !== 'object' || input === null || Array.isArray(input))
    throw new ValidationError('Body must be an object')
  return input as Record<string, unknown>
}

const parseCourse = (input: unknown): Icourse => {
  const { name, author, price, tags, isPublished } = asObject(input)

  if (typeof name !== 'string' || !name) throw new ValidationError('name is required')
  if (typeof author !== 'string' || !author) throw new ValidationError('author is required')
  if (typeof price !== 'number') throw new ValidationError('price must be a number')
  if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))
    throw new ValidationError('tags must be an array of strings')
  if (typeof isPublished !== 'boolean') throw new ValidationError('isPublished must be a boolean')

  return { name, author, price, tags, isPublished }
}

// Same rules as parseCourse, but every field is optional - only the fields that were sent are validated
const parseCourseChanges = (input: unknown): Partial<Icourse> => {
  const { name, author, price, tags, isPublished } = asObject(input)
  const changes: Partial<Icourse> = {}

  if (name !== undefined) {
    if (typeof name !== 'string' || !name) throw new ValidationError('name must be a non-empty string')
    changes.name = name
  }
  if (author !== undefined) {
    if (typeof author !== 'string' || !author) throw new ValidationError('author must be a non-empty string')
    changes.author = author
  }
  if (price !== undefined) {
    if (typeof price !== 'number') throw new ValidationError('price must be a number')
    changes.price = price
  }
  if (tags !== undefined) {
    if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string'))
      throw new ValidationError('tags must be an array of strings')
    changes.tags = tags
  }
  if (isPublished !== undefined) {
    if (typeof isPublished !== 'boolean') throw new ValidationError('isPublished must be a boolean')
    changes.isPublished = isPublished
  }

  if (Object.keys(changes).length === 0) throw new ValidationError('No fields to update')
  return changes
}
