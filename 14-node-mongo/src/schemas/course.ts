import { Schema } from 'mongoose'
import type { Icourse } from '../interfaces/course.ts'


export const courseSchema = new Schema<Icourse>({
  name: String,
  author: String,
  price: { type: Number, min: 0, max: 100 },
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
})
