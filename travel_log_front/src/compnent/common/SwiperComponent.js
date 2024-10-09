import { Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

import img1 from "./main/img1.jpg";
import img2 from "./main/img2.jpg";
import img3 from "./main/img3.jpg";
import img4 from "./main/img4.jpg";
import img5 from "./main/img5.jpg";

const SwiperComponent = () => {
  //메인 이미지 배열
  const images = [img1, img2, img3, img4, img5];

  return (
    <SwiperComponent
      modules={Autoplay}
      speed={1000}
      slidesPerView={1}
      spaceBetween={0}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 2500,
      }}
      breakpoints={{
        // 미디어 쿼리를 통해 지정한 화면 크기마다 원하는 Swiper 옵션 지정, 반응형
        375: {
          slidesPerView: 1, //브라우저가 375보다 클 때
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2, //브라우저가 768보다 클 때
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3, //브라우저가 1024보다 클 때
          spaceBetween: 0,
        },
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={"img-" + i}>
          <img style={{ width: "100%" }} src={img} />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default SwiperComponent;
