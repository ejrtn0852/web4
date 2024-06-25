async function fetchImages() {
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

const createDiv = (index) => {
  const parent = document.querySelector('.inner--img');
  for (let i = 0; i < index; i++) {
    const targetImgElement = document.createElement('div');
    targetImgElement.setAttribute("class", "inner--target--img display--none");
    parent.appendChild(targetImgElement);
  }

}


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const imgBinding = async () => {
  const imgRepository = await fetchImages();

  if (!imgRepository) return;

  createDiv(imgRepository.length);
  const target = document.querySelectorAll('.inner--target--img');
  const targetAll = [...target];

  for (const [index, targetElement] of targetAll.entries()) {
    targetElement.style.backgroundImage = `url("css/img/event/${imgRepository[index]}")`;
  }

  let index = 0;
  let size = imgRepository.length;

  while (true) {
    if (index === 0) {
      targetAll[size - 1].classList.remove('opacity--one');
      setTimeout(() => targetAll[size - 1].classList.remove('display--block'), 1000);
    } else {
      targetAll[index - 1].classList.remove('opacity--one');
      setTimeout(() => targetAll[index - 1].classList.remove('display--block'), 1000);
    }
    targetAll[index].classList.remove('display--none');
    await delay(50);
    targetAll[index].classList.add('display--block');
    targetAll[index].classList.add('opacity--one');
    index = (index + 1) % size;
    await delay(3000); // 지연을 위해 delay 함수 사용
  }


}



imgBinding();