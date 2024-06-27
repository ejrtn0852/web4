export const prev = (view, index) => {
  return index === 0 ? (view.length-1) : index -1;
}

export const next = (view, index) => {
  return index === 0 ? (view.length - 1) : index;
}


