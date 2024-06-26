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


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const imgBinding = async () => {
  const imgRepository = await fetchImages();

  if (!imgRepository) return;

  createDiv(imgRepository.length);
  const bannerView = Array.from(document.querySelectorAll('.inner--target--img'));
  const smallView = Array.from(document.querySelectorAll('.small--view--img'));

  bannerView.map( (element, index) => {
    element.style.backgroundImage = `url("css/img/event/${imgRepository[index]}")`;
    console.log(`Setting image for target ${index}: css/img/event/${imgRepository[index]}`);
  })

  smallView.map( (element, index) => {
    element.style.backgroundImage = `url("css/img/event/${imgRepository[index]}")`;
    console.log(`Setting image for target ${index}: css/img/event/${imgRepository[index]}`);
  })


  let index = 0;
  let size = imgRepository.length;
  const viewState = {isFirstIndex : true};
  while (true) {

    prevEffectOffBanner(index,  bannerView);
    smallViewTranslate(viewState, index,size);
    prevEffectOffSmallView(index,  smallView)

    bannerView[index].classList.remove('display--none');
    await delay(50);
    createEventMessage(index);
    smallView[index].classList.add("focus--border");
    smallView[index].classList.add("opacity--one");
    bannerView[index].classList.add('display--block');
    bannerView[index].classList.add('opacity--one');
    index = (index + 1) % size;
    await delay(3000); // 지연을 위해 delay 함수 사용
  }
}

const bannerEffect = ["display--block"]

const addEffectView = (bannerView, index, classToAdd) => {
  bannerView[index].classList.add('display--block');
  bannerView[index].classList.add('opacity--one');
}


const smallViewTranslate = (viewState, index, size) => {
  const viewWrap = document.querySelector('.view--wrap');
  const firstIndex = 0;
  const middleIndex = 4;


  if (viewState.isFirstIndex) {
    viewState.isFirstIndex = false;
    return;
  }
  if (index === firstIndex && !viewState.isFirstIndex) {
    viewWrap.classList.remove('translateX--1600');
    viewWrap.classList.add('translateX--zero');
  } else if (index === middleIndex) {
    viewWrap.classList.add('translateX--1600');
    viewWrap.classList.remove('translateX--zero');
  }
}

const prevEffectOffSmallView = (index, view) => {
  let size = view.length;
  if (index === 0) {
    view[size - 1].classList.remove('opacity--one');
    view[size - 1].classList.remove('focus--border')
  } else {
    view[index - 1].classList.remove('opacity--one');
    view[index - 1].classList.remove('focus--border')
  }
}


const prevEffectOffBanner = (index, view) => {
  let size = view.length;
  if (index === 0) {
    view[size - 1].classList.remove('opacity--one');
    setTimeout(() => view[size - 1].classList.remove('display--block'), 1000);
  } else {
    view[index - 1].classList.remove('opacity--one');
    setTimeout(() => view[index - 1].classList.remove('display--block'), 1000);
  }
}


imgBinding();