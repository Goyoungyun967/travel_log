import React, { useEffect, useRef, useState } from "react";
import "./boardMap.css";

const BoardMap = (props) => {
  const mapRef = useRef(null);
  const markerCount = useRef(0);
  const markers = useRef([]);
  const distances = useRef([]);
  const totalDistance = useRef(0);
  const polylines = useRef([]);
  const [distanceInfo, setDistanceInfo] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);

  //최초 지역
  const boardArea = props.boardArea;
  const setBoardArea = props.setBoardArea;
  const boardAreas = [
    { title: "서울", position: { lat: 37.5665, lng: 126.978 } },
    { title: "경기", position: { lat: 37.3942, lng: 126.982 } },
    { title: "부산", position: { lat: 35.1796, lng: 129.0756 } },
    { title: "대구", position: { lat: 35.8714, lng: 128.6014 } },
    { title: "인천", position: { lat: 37.4563, lng: 126.7052 } },
    { title: "대전", position: { lat: 36.3504, lng: 127.3845 } },
    { title: "광주", position: { lat: 35.1595, lng: 126.8526 } },
    { title: "울산", position: { lat: 35.5372, lng: 129.3116 } },
    { title: "세종", position: { lat: 36.4805, lng: 127.2892 } },
    { title: "강원", position: { lat: 37.8225, lng: 128.1556 } },
    { title: "충북", position: { lat: 36.6358, lng: 127.4896 } },
    { title: "충남", position: { lat: 36.6452, lng: 126.7076 } },
    { title: "경북", position: { lat: 36.5778, lng: 128.9995 } },
    { title: "경남", position: { lat: 35.2372, lng: 128.6901 } },
    { title: "전북", position: { lat: 35.8105, lng: 127.1084 } },
    { title: "제주", position: { lat: 33.4996, lng: 126.5312 } },
  ];

  useEffect(() => {
    const loadMap = () => {
      const naver = window.naver;
      if (!naver) {
        console.error("Naver Maps API is not loaded.");
        return;
      }

      const mapOptions = {
        center: new naver.maps.LatLng(37.5666103, 126.9783882),
        zoom: 14,
        logoControl: false,
        mapDataControl: false,
        scaleControl: true,
        zoomControl: false,
      };

      mapRef.current = new naver.maps.Map("map", mapOptions);

      naver.maps.Event.addListener(mapRef.current, "click", (event) => {
        if (isAddingMarker) {
          const latLng = event.coord;
          if (latLng) {
            const markerNumber = markerCount.current + 1;

            // 화살표 모양 마커 HTML
            const customIcon = {
              content: `
                <div className="accompany_cs_mapbridge">
                  <div className="accompany_map_marker" data-number="${markerNumber}">
                    ${markerNumber}
                  </div>
                </div>`,
              size: new naver.maps.Size(40, 40), // 크기 조정
              anchor: new naver.maps.Point(20, 40), // 앵커 포인트 조정
            };

            const newMarker = new naver.maps.Marker({
              position: latLng,
              map: mapRef.current,
              title: `마커 위치: ${latLng.lat()}, ${latLng.lng()}`,
              icon: customIcon,
              draggable: true,
            });

            markers.current.push(newMarker);
            markerCount.current += 1;

            if (markers.current.length > 1) {
              const previousMarker =
                markers.current[markers.current.length - 2];
              const distance = calculateDistance(
                previousMarker.getPosition(),
                newMarker.getPosition()
              );

              distances.current.push(distance);
              totalDistance.current += distance;

              const polyline = new naver.maps.Polyline({
                path: [previousMarker.getPosition(), newMarker.getPosition()],
                map: mapRef.current,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 3,
              });

              polylines.current.push(polyline);
              updateDistanceInfo();
            }
          }
        }
      });
    };

    const checkNaverMap = setInterval(() => {
      if (window.naver) {
        clearInterval(checkNaverMap);
        loadMap();
      }
    }, 100);

    return () => clearInterval(checkNaverMap);
  }, [isAddingMarker]);

  const calculateDistance = (pos1, pos2) => {
    const R = 6371; // 지구 반지름 (킬로미터)
    const lat1 = pos1.lat() * (Math.PI / 180);
    const lon1 = pos1.lng() * (Math.PI / 180);
    const lat2 = pos2.lat() * (Math.PI / 180);
    const lon2 = pos2.lng() * (Math.PI / 180);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 거리 반환
  };

  const updateDistanceInfo = () => {
    const info = distances.current.map((distance, index) => ({
      segment: `${index + 1} ~ ${index + 2}`,
      distance: distance.toFixed(2),
    }));
    info.push({
      segment: "총 거리",
      distance: totalDistance.current.toFixed(2),
    });
    setDistanceInfo(info);
  };

  const handleAddMarkerClick = () => {
    setIsAddingMarker((prev) => !prev);
  };

  return (
    <div>
      <button onClick={handleAddMarkerClick} className="accompany-marker-btn">
        {isAddingMarker ? "마커 추가 중지" : "마커 추가 시작"}
      </button>
      <div id="map" style={{ width: "100%", height: "300px" }} />
      <div className="distance-info">
        {distanceInfo.map((info, index) => (
          <div key={index}>
            {info.segment}: {info.distance} km
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardMap;
