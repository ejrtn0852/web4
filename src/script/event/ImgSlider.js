import delay from "../utill/Delay.js";

const ImgSlider = async () => {
  let index = 0;
  let viewState = true;
  const bannerEffect = ["display--block"];
  const smallViewEffect = ["focus--border"];
  const opacityEffect = ["opacity--one"];

  const setIndex = (currentIndex) => {
    index = currentIndex;
  }

  const addEffectView = (view, index, [optionA, optionB]) => {
    view[index].classList.add(optionA);
    view[index].classList.add(optionB);
  }

  const smallViewTranslate = () => {
    const viewWrap = document.querySelector('.view--wrap');
    const firstIndex = 0;
    const middleIndex = 4;

    if (viewState) {
      viewState = false;
      return;
    }
    if (index === firstIndex && !viewState) {
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

  const start = async () => {
    const bannerView = document.querySelectorAll('.inner--target--img');
    const smallView = document.querySelectorAll('.small--view--img');
    while (true) {
      prevEffectOffBanner(index, bannerView);
      smallViewTranslate();
      prevEffectOffSmallView(index, smallView);

      bannerView[index].classList.remove('display--none');
      await delay(50);
      addEffectView(bannerView, index, [...bannerEffect, ...opacityEffect]);
      addEffectView(smallView, index, [...smallViewEffect, ...opacityEffect]);
      index = (index + 1) % bannerView.length;
      await delay(3000);
    }
  }

  return {
    start,
    setIndex
  }
}
export default ImgSlider;