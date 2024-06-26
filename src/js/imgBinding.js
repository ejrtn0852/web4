const message = {
  text : [
    ["넥슨 30주년 기념!", "최대 30만원 혜택!"],
    ["하이퍼버닝"],
    ["반레온의", "검술"],
    ["스폐셜", "썬데이 메이플"],
    ["개화월영 비급"],
    ["아란 & 은월", "리마스터" ],
    ["아이템 버닝"],
    [""]
  ],
  date : [
    ["2024년 06월 ~ 2024년 07월 25일"],
    ["2024년 06월 20일 ~ 2024년 10월 20일"],
    ["2024년 06월 20일 ~ 2024년 7월 14일"],
    ["2024년 06월 14일 ~ 2024년 7월 14일"],
    ["2024년 06월 20일 ~ 2024년 7월 14일 "],
    [""],
    ["2024년 06월 14일 ~ 2024년 10월 20일"],
    [""]
  ],

}

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
    if (imgRepository[index]) {
      targetElement.style.backgroundImage = `url("css/img/event/${imgRepository[index]}")`;
      console.log(`Setting image for target ${index}: css/img/event/${imgRepository[index]}`);
    } else {
      console.log(`No image for target ${index}`);
    }
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
    createEventMessage(index);
    targetAll[index].classList.add('display--block');
    targetAll[index].classList.add('opacity--one');
    index = (index + 1) % size;
    await delay(3000); // 지연을 위해 delay 함수 사용
  }
}



const createEventMessage = (index) => {
  const {text: eventText, date: eventDate} = message;
  if (index > eventText.length) return;
  const textAll = document.querySelectorAll('.inner--text');

  textAll.forEach((text, forIndex) => {
    if (forIndex === 2) {
      text.textContent = eventDate[index];
    } else {
      text.textContent = eventText[index][forIndex] || '';
    }
  });

}

imgBinding();