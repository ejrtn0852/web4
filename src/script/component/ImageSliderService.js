import Element from "./Element.js";
import StartBind from "./imgBinding.js";
import Message from "./message.js";
import ImgSlider from "../event/ImgSlider.js";


const ImageSliderService = async () => {
  const element = Element();
  const imgBinding = await StartBind();
  const message = await Message();
  const imgSlider = await ImgSlider();

  const createIndex = imgBinding.imgSize();
  element.createBannerElement(createIndex);
  message.updateEventMessage(createIndex);
  imgBinding.bindImage();
  await imgSlider.start()

}

window.addEventListener('DOMContentLoaded', ImageSliderService);