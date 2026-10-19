import type { Icourse } from './course.ts'

export type SavedCourse = Icourse & { id: string }

// The contract the controller depends on - any storage (mongoose, SQL, in-memory...) can implement it
// find/update/delete resolve to null when there is no course with that id
export interface ICourseRepository {
  save(course: Icourse): Promise<SavedCourse>
  find(): Promise<SavedCourse[]>
  findById(id: string): Promise<SavedCourse | null>
  update(id: string, changes: Partial<Icourse>): Promise<SavedCourse | null>
  delete(id: string): Promise<SavedCourse | null>
}
