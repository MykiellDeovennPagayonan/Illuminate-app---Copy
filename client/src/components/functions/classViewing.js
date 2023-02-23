import { classViewing } from "../controlling-variables/controlling-variables"

export function nextClassView(classViewLength) {
  if (classViewing < classViewLength - 1){
    classViewing++
  } else {
    classViewing = 0
  }
}

export function prevClassView(classViewLength) {
  if (classViewing > 0){
    classViewing--
  } else {
    classViewing = classViewLength - 1
  }
}