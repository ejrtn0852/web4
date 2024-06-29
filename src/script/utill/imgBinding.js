import fetchImages from "../fetcher/ImageFetchs.js";

const StartBind = async () => {

  const imgRepository = await fetchImages();

  const bindImage = () => {
    const bannerView = document.querySelectorAll('.inner--target--img');
    const smallView = document.querySelectorAll('.small--view--img');
    if (!imgRepository) return;


    bannerView.forEach( (element, index) => {
      element.style.backgroundImage = `url("src/css/img/event/${imgRepository[index]}")`;

    })
    smallView.forEach( (element, index) => {
      element.style.backgroundImage = `url("src/css/img/event/${imgRepository[index]}")`;
    })
  }

  const imgSize = () => {
    return imgRepository.length;
  }

  // imgSliderService(bannerView, smallView, imgRepository.length);
  return {
    bindImage,
    imgSize
  }
}

export default StartBind;


