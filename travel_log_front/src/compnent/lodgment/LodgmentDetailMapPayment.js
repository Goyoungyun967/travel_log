import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const LodgmentDetailMapPayment = (props) => {
  const lodgmentAddr = props.lodgmentAddr;
  const lodgmentName = props.lodgmentName;
  //console.log(lodgmentAddr);

  // console.log(lodgmentNo);
  const KakaoKey = process.env.REACT_APP_HS_KAKAO_REST_API_KEY;
  const [lodgmentLongitude, setsLodgmentLongitude] = useState("");
  //console.log(lodgmentLongitude);
  const [lodgmentLatitude, setLodgmentLatitude] = useState("");
  //console.log(lodgmentLatitude);
  fetch(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
      lodgmentAddr
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
        //console.log("주소를 찾을 수 없습니다.");
      }
    })
    .catch((error) => {
      //console.error("API 호출 오류:", error);
      Swal.fire({
        text: "서버 오류, 관리자에게 문의하세요",
      });
    });
  return (
    <div>
      <Map
        level={6}
        center={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
        style={{ width: "100%", height: "200px" }}
      >
        <MapMarker position={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}>
          <a
            href={`https://map.kakao.com/link/map/${lodgmentName},${lodgmentLatitude},${lodgmentLongitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lodgmentName}
          </a>
        </MapMarker>
      </Map>
    </div>
  );
};
export default LodgmentDetailMapPayment;
