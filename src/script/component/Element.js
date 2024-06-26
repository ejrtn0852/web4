const Element = () => {

  const createInnerText = () => {
    const parents = document.querySelectorAll('.inner--target--img');
    parents.forEach(parent => {
      const wrap = document.createElement('div');
      wrap.setAttribute('class', 'inner--text--wrap');
      for (let j = 0; j < 3; j++) {
        const innerText = document.createElement('span');
        innerText.setAttribute('class', 'inner--text');
        wrap.appendChild(innerText)
      }
      parent.appendChild(wrap);
    });
  }

  const createBannerElement = (count) => {
    const parent = document.querySelector('.inner--img');
    for (let i = 0; i < count; i++) {
      const targetImgElement = document.createElement('li');
      targetImgElement.setAttribute("class", "inner--target--img display--none");
      targetImgElement.dataset.index = i.toString();
      parent.appendChild(targetImgElement);
    }
    createInnerText();
    createDataSet();
  }

  const createDataSet = () => {
      const smallViewImg = document.querySelectorAll('.small--view--img');
      smallViewImg.forEach( (element, index) => {
        element.dataset.index = index.toString();
      })
  }

  return {
    createBannerElement
  };
}

export default Element;