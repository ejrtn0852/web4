const mappingMap = new Map();
const smallView = document.querySelectorAll('.small--view--img');

const NavigationAdapter = () => {

  const createMappingMap = () => {
    if (mappingMap.size === 0) {
      mappingMap.set("next", getNextIndex);
      mappingMap.set("prev", getPrevIndex);
    }
  }

  const getNextIndex = (index) => {
    if (index === smallView.length) {
      return 0;
    }
    return index;
  }

  const getPrevIndex = (index) => {
    if (index === smallView.length - 1) {
      return smallView.length - 1;
    }
    return index;
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
  };
}

export default NavigationAdapter;