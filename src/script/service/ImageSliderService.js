import Element from "../component/Element.js";
import StartBind from "../utill/imgBinding.js";
import Message from "../component/message.js";
import ImgSlider from "../event/ImgSlider.js";

const ImageSliderService = async () => {
  const element = Element();
  const imgBinding = await StartBind();
  const message = await Message();

  const createIndex = imgBinding.imgSize();
  console.log("이미지 바인딩 두 번째 호출: " + createIndex)
  element.createBannerElement(createIndex);
  message.updateEventMessage(createIndex);
  imgBinding.bindImage();
  const imgSlider = ImgSlider();
  imgSlider.addEventHandlers();
  await  imgSlider.start();
}

export default ImageSliderService;
window.addEventListener('DOMContentLoaded', ImageSliderService);