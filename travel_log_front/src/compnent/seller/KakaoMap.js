import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;
// const KakaoMap = (prop) => {
//   useEffect(() => {
//     const container = document.getElementById("map");
//     const options = {
//       center: new kakao.map.LatLng(33.450701, 126.570667),
//       level: 3,
//     };
//     const map = new kakao.maps.Map(container, options);
//   }, []);
//   return <div id="map" style={{ width: "500px", height: "500px" }}></div>;
// };

// const KakaoMap = (props) => {
//   const lodgmentAddr = props.lodgmentAddr;
//   const apiKey = "466b11e7eb2d3b4c82749b96e0caa41b";
//   // 상태로 지도 중심 좌표를 저장
//   const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 }); // 초기 좌표 (서울 시청)
//   // 카카오 API 호출

//   // 카카오 API 호출
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.async = true;
//     script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services`;
//     if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
//       window.kakao.maps.load(() => {
//         const container = document.getElementById("map");
//         const options = {
//           center: new window.kakao.maps.LatLng(center.lat, center.lng),
//           level: 3, // 지도 확대 레벨
//         };

//         const map = new window.kakao.maps.Map(container, options);

//         const geocoder = new window.kakao.maps.services.Geocoder();

//         // lodgmentAddr로 주소 검색 후 좌표 변환
//         geocoder.addressSearch(lodgmentAddr, (result, status) => {
//           if (status === window.kakao.maps.services.Status.OK) {
//             const coords = {
//               lat: result[0].y,
//               lng: result[0].x,
//             };
//             console.log(coords);
//             // 좌표 상태 업데이트
//             setCenter(coords);

//             const marker = new window.kakao.maps.Marker({
//               map: map,
//               position: new window.kakao.maps.LatLng(coords.lat, coords.lng),
//             });

//             // 지도 중심을 검색된 좌표로 이동
//             map.setCenter(new window.kakao.maps.LatLng(coords.lat, coords.lng));
//           } else {
//             console.error("주소 검색 실패: " + status);
//           }
//         });
//       });
//     } else {
//       console.error("카카오 지도 API가 로드되지 않았습니다.");
//     }
//   }, [lodgmentAddr, center]);

//   return <div id="map" style={{ width: "100%", height: "300px" }}></div>;
// };

// const KakaoMap = (props) => {
//   const lodgmentAddr = props.lodgmentAddr;
//   console.log("주소 - ", lodgmentAddr);
//   const [map, setMap] = useState();
//   useEffect(() => {
//     if (!map) return;

//     // 주소-좌표 변환 객체를 생성합니다
//     const geocoder = new kakao.maps.services.Geocoder();

//     // 주소로 좌표를 검색합니다
//     geocoder.addressSearch(lodgmentAddr, (result, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//         // 결과값으로 받은 위치를 마커로 표시합니다
//         new kakao.maps.Marker({
//           map: map,
//           position: coords,
//         });

//         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
//         map.setCenter(coords);
//       }
//     });
//   }, [lodgmentAddr, map]);
//   return (
//     <Map // 로드뷰를 표시할 Container
//       center={{
//         lat: 37.566826,
//         lng: 126.9786567,
//       }}
//       style={{
//         width: "100%",
//         height: "350px",
//       }}
//       level={3}
//       onCreate={setMap}
//     ></Map>
//   );
// };

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
