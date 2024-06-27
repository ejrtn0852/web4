import {prev,next} from "../utill/utill.js"

const smallView = document.querySelectorAll('.small--view--img');
const mappingMap = new Map();

const AddEffectAdapter = () => {

  const nextAddEffect = (view, index, [optionA, optionB]) => {
    // 7번일 때 호출되면 0으로 이동하기위해 0 반환
    const nextIndex = (index + 1) % view.length;
      view[nextIndex].classList.add(optionA);
    if (optionB) {
      view[nextIndex].classList.add(optionB);
    }
    return nextIndex
  }

  const prevAddEffect = ( view, index, [optionA, optionB]) => {
    const currentIndex = prev( view, index);
    view[currentIndex].classList.add(optionA);
    if (optionB) {
      view[currentIndex].classList.add(optionB);
    }
    return currentIndex;
  }

  const createMappingMap = () => {
    if (mappingMap.size === 0) {
      mappingMap.set("next", nextAddEffect);
      mappingMap.set("prev", prevAddEffect);
    }
  }

  const supports = (element) => {
    createMappingMap();
    for (const [key, value] of mappingMap) {
      if (element === key) {
        return value;
      }
    }
  };

  return {
    supports
  }
}

export default AddEffectAdapter;

// 끝에서 0으로갈때
// 처음에서 끝으로갈때