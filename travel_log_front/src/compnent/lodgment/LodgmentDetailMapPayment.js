import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
const LodgmentDetailMapPayment = () => {
  const params = useParams();
  const lodgmentNo = params.lodgmentNo;
  // console.log(lodgmentNo);
  const KakaoKey = process.env.REACT_APP_HS_KAKAO_REST_API_KEY;
  const [lodgmentLongitude, setsLodgmentLongitude] = useState("");
  //console.log(lodgmentLongitude);
  const [lodgmentLatitude, setLodgmentLatitude] = useState("");
  //console.log(lodgmentLatitude);
  const address = "인천 중구 영종해안남로 19-5";
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
        //console.log(`경도: ${longitude}, 위도: ${latitude}`);
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
    <div>
      <div>위치</div>

      <Map
        level={6}
        center={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
        style={{ width: "100%", height: "300px" }}
      >
        <MapMarker position={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}>
          <a
            href={`https://map.kakao.com/link/map/네스트호텔,${lodgmentLatitude},${lodgmentLongitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            네스트호텔
          </a>
        </MapMarker>
      </Map>
      <div>{address}</div>
    </div>
  );
};
export default LodgmentDetailMapPayment;
