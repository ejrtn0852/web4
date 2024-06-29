const fetchImages =  () => {
  const arr = [];
  for (let i = 1; i <= 8; i++) {
    arr.push(`event-img-${i}.jpg`);
    console.log(arr)
  }

  return arr;
}

export default fetchImages;