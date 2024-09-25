import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;

const KakaoMap = (props) => {
  const KakaoKey = process.env.REACT_APP_SB_KAKAO_REST_API_KEY;
  const [lodgmentLatitude, setLodgmentLatitude] = useState("");
  const [lodgmentLongitude, setsLodgmentLongitude] = useState("");
  const address = props.lodgmentAddr;
  fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      address
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: "KakaoAK " + KakaoKey,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.documents.length > 0) {
        const { x: longitude, y: latitude } = data.documents[0].address;
        setsLodgmentLongitude(longitude);
        setLodgmentLatitude(latitude);
      } else {
        console.log("주소를 찾을 수 없습니다.");
      }
    })
    .catch((error) => {
      console.error("API 호출 오류:", error);
    });

  return (
    <>
      <Map
        level={3}
        center={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
        style={{ width: "100%", height: "300px" }}
      >
        <MapMarker
          position={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
        ></MapMarker>
      </Map>
    </>
  );
};

export default KakaoMap;
