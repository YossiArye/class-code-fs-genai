import { Error as MongooseError, isValidObjectId, model } from 'mongoose'
import { ValidationError } from '../errors.ts'
import type { Icourse } from '../interfaces/course.ts'
import type { ICourseRepository, SavedCourse } from '../interfaces/course-repository.ts'
import { courseSchema } from '../schemas/course.ts'

export const Course = model<Icourse>('Course', courseSchema)

const toSavedCourse = (doc: InstanceType<typeof Course>): SavedCourse => ({
  id: doc.id,
  name: doc.name!,
  author: doc.author!,
  price: doc.price!,
  tags: [...doc.tags],
  date: doc.date,
  isPublished: doc.isPublished!,
})

// Mongoose validation errors become our own ValidationError, so callers don't depend on mongoose
const translateErrors = async <T>(action: () => Promise<T>): Promise<T> => {
  try {
    return await action()
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) throw new ValidationError(error.message)
    throw error
  }
}

// The mongoose implementation of the repository the controller expects
export const courseRepository: ICourseRepository = {
  save: course => translateErrors(async () => toSavedCourse(await new Course(course).save())),

  async find() {
    return (await Course.find()).map(toSavedCourse)
  },

  async findById(id) {
    if (!isValidObjectId(id)) return null
    const doc = await Course.findById(id)
    return doc && toSavedCourse(doc)
  },

  async update(id, changes) {
    if (!isValidObjectId(id)) return null
    return translateErrors(async () => {
      const doc = await Course.findByIdAndUpdate(id, changes, { new: true, runValidators: true })
      return doc && toSavedCourse(doc)
    })
  },

  async delete(id) {
    if (!isValidObjectId(id)) return null
    const doc = await Course.findByIdAndDelete(id)
    return doc && toSavedCourse(doc)
  },
}
