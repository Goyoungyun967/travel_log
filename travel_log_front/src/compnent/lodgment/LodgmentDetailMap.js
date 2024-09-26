import axios from "axios";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const LodgmentDetailMap = () => {
  const KakaoKey = process.env.REACT_APP_HS_KAKAO_REST_API_KEY;
  const weatherKey = process.env.REACT_APP_HS_WEATHER_API_KEY;
  const [lodgmentLongitude, setsLodgmentLongitude] = useState("");
  const [lodgmentLatitude, setLodgmentLatitude] = useState("");
  const address = "인천 중구 영종해안남로 19-5";
  const weatherDescKo = {
    200: "비를 동반한 천둥구름",
    201: "가벼운 비를 동반한 천둥구름",
    202: "폭우를 동반한 천둥구름",
    210: "약한 천둥구름",
    211: "천둥구름",
    212: "강한 천둥구름",
    221: "불규칙적 천둥구름",
    230: "약한 연무를 동반한 천둥구름",
    231: "연무를 동반한 천둥구름",
    232: "강한 안개비를 동반한 천둥구름",
    300: "가벼운 안개비",
    301: "안개비",
    302: "강한 안개비",
    310: "가벼운 적은비",
    311: "적은비",
    312: "강한 적은비",
    313: "소나기와 안개비",
    314: "강한 소나기와 안개비",
    321: "소나기",
    500: "악한 비",
    501: "중간 비",
    502: "강한 비",
    503: "매우 강한 비",
    504: "극심한 비",
    511: "우박",
    520: "약한 소나기 비",
    521: "소나기 비",
    522: "강한 소나기 비",
    531: "불규칙적 소나기 비",
    600: "가벼운 눈",
    601: "눈",
    602: "강한 눈",
    611: "진눈깨비",
    612: "소나기 진눈깨비",
    615: "약한 비와 눈",
    616: "비와 눈",
    620: "약한 소나기 눈",
    621: "소나기 눈",
    622: "강한 소나기 눈",
    701: "박무",
    711: "연기",
    721: "연무",
    731: "모래 먼지",
    741: "안개",
    751: "모래",
    761: "먼지",
    762: "화산재",
    771: "돌풍",
    781: "토네이도",
    800: "구름 한 점 없는 맑은 하늘",
    801: "약간의 구름이 낀 하늘",
    802: "드문드문 구름이 낀 하늘",
    803: "구름이 거의 없는 하늘",
    804: "구름으로 뒤덮인 흐린 하늘",
    900: "토네이도",
    901: "태풍",
    902: "허리케인",
    903: "한랭",
    904: "고온",
    905: "바람부는",
    906: "우박",
    951: "바람이 거의 없는",
    952: "약한 바람",
    953: "부드러운 바람",
    954: "중간 세기 바람",
    955: "신선한 바람",
    956: "센 바람",
    957: "돌풍에 가까운 센 바람",
    958: "돌풍",
    959: "심각한 돌풍",
    960: "폭풍",
    961: "강한 폭풍",
    962: "허리케인",
  };

  const [weather, setWeather] = useState({
    description: "",
    name: "",
    temp: "",
    icon: "",
  });
  //console.log(weather);
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
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lodgmentLatitude}&lon=${lodgmentLongitude}&appid=${weatherKey}&units=metric`
      )
      .then((res) => {
        // console.log(res);
        // id 찾아서 매칭 후 description 한글 번역된 거 가져오기
        const weatherId = res.data.weather[0].id;
        const weatherKo = weatherDescKo[weatherId];
        // console.log(weatherId);
        // console.log(weatherKo);
        // 날씨 아이콘 가져오기
        const weatherIcon = res.data.weather[0].icon;
        const weatherIconAdrs = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        // 소수점 버리기
        const temp = Math.round(res.data.main.temp);
        setWeather({
          description: weatherKo,
          name: res.data.name,
          temp: temp,
          icon: weatherIconAdrs,
        });
        //console.log(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lodgmentLatitude, lodgmentLongitude]);
  return (
    <>
      <div className="lodgment-detail-map">
        <div>위치</div>
        <Map
          level={6}
          center={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
          style={{ width: "100%", height: "300px" }}
        >
          <MapMarker
            position={{ lat: lodgmentLatitude, lng: lodgmentLongitude }}
          >
            <div>네스트 호텔</div>
          </MapMarker>
        </Map>
        <div>{address}</div>
      </div>

      <div>
        <div>지금 날씨는 </div>
        <table>
          <tbody>
            <tr>
              <td>
                <span> {weather.name}</span>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <span> {weather.temp} °C</span>
                {weather.icon && (
                  <img src={weather.icon} alt={weather.description} />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <span>{weather.description}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default LodgmentDetailMap;
