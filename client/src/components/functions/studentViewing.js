import { studentViewing } from "../controlling-variables/controlling-variables"

export function nextStudentView(studentViewLength) {
  if (studentViewing < studentViewLength - 1) {
    studentViewing++
  } else {
    studentViewing = 0
  }
}

export function prevStudentView(studentViewLength) {
  if (studentViewing > 0) {
    studentViewing--
  } else {
    studentViewing = studentViewLength - 1
  }
}