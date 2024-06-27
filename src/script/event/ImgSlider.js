import delay from "../utill/Delay.js";
import ClassNameProcessor from "./ClassResoiver.js";
import { prev} from "../utill/utill.js";
import AddEffectAdapter from "./AddEffectAdapter.js";
import NavigationAdapter from "./NavigationAdapter.js";

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
  opacityEffect : "opacity--one",
  focusEffect: "focus--border"
};



// todo 사이즈 관리하는 객체추가



const ImgSlider = () => {
  const bannerView = document.querySelectorAll('.inner--target--img');
  const smallView = document.querySelectorAll('.small--view--img');
  const viewWrap = document.querySelector('.view--wrap');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');


  const addEffect = (element, [effectA, effectB]) => {
    element.classList.add(effectA);
    if (effectB) {
      element.classList.add(effectB);
    }
  };


  const smallViewTranslate = () => {
    // 여기만 수정하면 이미지슬라이드 끝
    const firstIndex = 0;
    const middleIndex = 4;
    const lastIndex = smallView.length -1;
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
    } else if (index === lastIndex) {
      viewWrap.classList.add('translateX--1600');
    }
  }

  const removeEffects = (element, [effectA, effectB]) => {
    element.classList.remove(effectA);
    if (effectB) {
      element.classList.remove(effectB);
    }
  };


  const closeAllEffect = () => {
    const element = document.querySelector(`[data-index="${indexManger.index - 1}"]`);
    element.classList.remove('opacity--one');
  }

  const resetAndRestartProcess = async (index) => {
    closeAllEffect();
    clearInterval(intervalManager.intervalId);
    indexManger.index = index;
    await start();
  }
  const restartProcess = async (index) => {

    clearInterval(intervalManager.intervalId);
    indexManger.index = index;
    await start();
  }

  const process = async () => {
    const { index} = indexManger;
    const { opacityEffect, focusEffect} = EffectState;
    const prevIndex = prev(bannerView,indexManger.index);

    removeEffects(bannerView[prevIndex], [opacityEffect]);
    smallViewTranslate();
    removeEffects(smallView[prevIndex], [opacityEffect, focusEffect]);

    await delay(50);
    addEffect(bannerView[index],[opacityEffect]);
    addEffect(smallView[index],[opacityEffect, focusEffect]);
    indexManger.index = (indexManger.index + 1) % bannerView.length;
  }

  const start = async (index) => {
    await process(index)
    intervalManager.intervalId = setInterval(process,  3000);
  }

  const imageClickHandler = async (event) => {
    const target = event.target;
    await resetAndRestartProcess(parseInt(target.dataset.index));
  }

  const buttonEffectHandler = async (event) => {
    const { opacityEffect, focusEffect} = EffectState;
    const currentSlider = document.querySelector('.small--view--img.focus--border.opacity--one');
    const currentIndex = parseInt(currentSlider.dataset.index);
    const currentTarget = tagResolver(event.currentTarget);
    removeEffects(smallView[currentIndex], [opacityEffect, focusEffect]);

    const addEffectAdapter = AddEffectAdapter();
    const addHandler = addEffectAdapter.supports(currentTarget);

    const pointer = addHandler(smallView, currentIndex, [opacityEffect,focusEffect]);

    const navigationAdapter = NavigationAdapter();
    const getIndexHandler = navigationAdapter.supports(currentTarget);
    const index = getIndexHandler(pointer);
    await restartProcess(index);
  }

  const addEventHandlers = () => {
    smallView.forEach( element => element.addEventListener("click", imageClickHandler));
    nextBtn.addEventListener('click', buttonEffectHandler);
    prevBtn.addEventListener('click', buttonEffectHandler);
  }

  const tagResolver = (classes) => {
     const classNameProcessor = ClassNameProcessor();
    return classNameProcessor.getClassName(classes);
  }

  return {
    start,
    resetAndRestartProcess,
    addEventHandlers,
  }
}
export default ImgSlider;