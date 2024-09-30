import Carousel from "react-bootstrap/Carousel";

const SlideImg = (props) => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const file = props.roomFile;
  const imgSize = props.imgsize;
  return (
    <>
      {file && file.length > 0 ? ( // 파일이 존재할 때만 Carousel 렌더링
        <Carousel data-bs-theme="dark">
          {file.map((img, i) => (
            <Carousel.Item key={i}>
              <img
                className={`d-block w-100 ${imgSize}`}
                src={`${backServer}/seller/room/${img.roomImg}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <img
          className="d-block" // 디폴트 이미지에는 className 설정
          src="/image/lodgment_default_img.png"
        />
      )}
    </>
  );
};

export default SlideImg;
