const fetchImages = async () => {
  try {
    const response = await fetch('../images.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;  // 오류가 발생하면 null 반환
  }
}

export default fetchImages;