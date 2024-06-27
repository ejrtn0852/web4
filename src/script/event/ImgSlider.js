import delay from "../utill/Delay.js";

//  동시성, 병렬성 CPU 바운드, I/O 바운드

const sliderState = {
  viewState: true,
}

const indexManger = {
  index: 0
}

const intervalManager  = {
  intervalId: ""
};

const EffectState = {
  opacityEffect : ["opacity--one"],
  focusEffect: ["focus--border"]
};



const ImgSlider = () => {
  const bannerView = document.querySelectorAll('.inner--target--img');
  const smallView = document.querySelectorAll('.small--view--img');

  const addEffectView = (view, index, [optionA, optionB]) => {
    if (!optionB) {
      view[index].classList.add(optionA);
      return;
    }
    view[index].classList.add(optionA);
    view[index].classList.add(optionB);
  }

  const smallViewTranslate = () => {
    const viewWrap = document.querySelector('.view--wrap');
    const firstIndex = 0;
    const middleIndex = 4;
    const {viewState} = sliderState;
    const {index} = indexManger;

    if (viewState) {
      sliderState.viewState = false;
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

  const closeAllEffect = () => {
    const element = document.querySelector(`[data-index="${indexManger.index - 1}"]`);
    element.classList.remove('opacity--one');
  }

  const reRunProcess = async (index) => {
    closeAllEffect();
    clearInterval(intervalManager.intervalId);
    indexManger.index = index;
    await start();
  }

  const process = async () => {
    const {index} = indexManger;
    const { opacityEffect, focusEffect} = EffectState;

    prevEffectOffBanner(index, bannerView);
    smallViewTranslate();
    prevEffectOffSmallView(index, smallView);

    bannerView[index].classList.remove('display--none');
    await delay(50);
    addEffectView(bannerView, index, [ ...opacityEffect]);
    addEffectView(smallView, index, [...focusEffect, ...opacityEffect]);
    indexManger.index = (indexManger.index + 1) % bannerView.length;
  }

  const start = async () => {
    await process();
    intervalManager.intervalId = setInterval(process,  3000);
  }

  const addEventHandlers = () => {
    smallView.forEach( element => {
      element.addEventListener("click", async(event) => {
        const target = event.target;
        await reRunProcess(parseInt(target.dataset.index));
      })
    })
  }

  return {
    start,
    reRunProcess,
    addEventHandlers,
  }
}
export default ImgSlider;