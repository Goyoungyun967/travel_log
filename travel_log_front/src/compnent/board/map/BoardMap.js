import React, { useEffect, useRef, useState } from "react";
import "./boardMap.css"; // CSS 파일을 추가하세요.
import DaumPostcode from "react-daum-postcode";

const BoardMap = (props) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [itinerary, setItinerary] = useState([]);
  const daysDifference = props.daysDifference;
  const accompanyContent = props.accompanyContent;
  const setAccompanyContent = props.setAccompanyContent;
  const [addresses, setAddresses] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [postcodeVisible, setPostcodeVisible] = useState(false);

  useEffect(() => {
    const loadMap = () => {
      const kakao = window.kakao;
      if (!kakao) {
        console.error("Kakao Maps API is not loaded.");
        return;
      }

      const mapOptions = {
        center: new kakao.maps.LatLng(37.5666103, 126.9783882), // 서울 시청
        level: 4,
      };

      mapRef.current = new kakao.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      // 초기 마커 설정
      markerRef.current = new kakao.maps.Marker({
        position: mapOptions.center,
        map: mapRef.current,
      });

      setMapLoaded(true);
    };

    // Kakao Maps API 로드 확인
    const checkKakaoMap = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkKakaoMap);
        loadMap();
      }
    }, 100);

    return () => clearInterval(checkKakaoMap);
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      // 스타일이 변경된 후에 relayout() 호출
      mapRef.current.relayout();
    }
  }, [mapLoaded]);

  const handleAddressSearch = (address) => {
    const kakao = window.kakao;
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      console.error("Kakao Maps API is not properly loaded.");
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (results, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(results[0].y, results[0].x);
        mapRef.current.setCenter(coords); // 지도 중심 이동
        markerRef.current.setPosition(coords); // 마커 위치 변경
        setAddresses((prev) => [...prev, address]); // 주소 목록 업데이트
        setPostcodeVisible(false); // 주소 검색 창 닫기
      } else {
        console.error("주소 검색 실패");
      }
    });
  };

  const handleItineraryChange = (index, event) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = event.target.value;
    setItinerary(newItinerary);
    setAccompanyContent(newItinerary);
  };

  useEffect(() => {
    if (daysDifference > 0) {
      const initialItinerary = new Array(daysDifference).fill("");
      setItinerary(initialItinerary);
      setAccompanyContent(initialItinerary);
    }
  }, [daysDifference, setAccompanyContent]);

  return (
    <div>
      <div className="address-search">
        <button onClick={() => setPostcodeVisible(true)}>주소 검색</button>
        {postcodeVisible && (
          <DaumPostcode
            onComplete={(data) => {
              const address = data.address;
              handleAddressSearch(address);
            }}
          />
        )}
      </div>

      <div className="map-container">
        <div
          id="map"
          style={{
            width: "100%",
            height: "400px",
            display: mapLoaded ? "block" : "none",
          }}
        />
      </div>

      <div>
        <h3>여행일정</h3>
        {itinerary.map((entry, index) => (
          <div key={index} className="diary_content_list">
            <label>{index + 1}일차</label>
            <textarea
              className="diary-textarea"
              value={entry}
              onChange={(event) => handleItineraryChange(index, event)}
              placeholder={`Day ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="address-list">
        <h3>검색한 주소</h3>
        {addresses.map((address, index) => (
          <div key={index}>
            <span>{index + 1}:</span>
            <span>{address}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardMap;
