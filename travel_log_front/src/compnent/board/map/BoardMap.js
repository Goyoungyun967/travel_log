import React, { useEffect, useRef, useState } from "react";

const BoardMap = () => {
  const mapRef = useRef(null); // 지도를 저장할 참조
  const [isAddingMarker, setIsAddingMarker] = useState(false); // 마커 추가 모드 상태
  const markerCount = useRef(0); // 마커 개수를 저장할 useRef
  const markers = useRef([]); // 마커를 저장할 배열
  const polylines = useRef([]); // 폴리라인을 저장할 배열

  useEffect(() => {
    const loadMap = () => {
      const { naver } = window; // Naver Maps API를 가져옴

      if (!naver) {
        console.error("Naver Maps API is not loaded."); // API가 로드되지 않았을 때 오류 출력
        return;
      }

      // 지도 옵션 설정
      const mapOptions = {
        center: new naver.maps.LatLng(37.5666103, 126.9783882), // 서울 시청 위치
        zoom: 14, // 초기 줌 레벨
        logoControl: false, // 로고 컨트롤 비활성화
        mapDataControl: false, // 지도 데이터 컨트롤 비활성화
        scaleControl: true, // 축척 컨트롤 활성화
        zoomControl: false, // 줌 컨트롤 비활성화
      };

      // 지도 객체 생성
      mapRef.current = new naver.maps.Map("map", mapOptions);

      // 클릭 이벤트 리스너 추가
      naver.maps.Event.addListener(mapRef.current, "click", (event) => {
        const latLng = event.coord; // 클릭한 위치의 LatLng 가져오기
        console.log("Clicked at:", latLng); // 클릭 위치 로그 출력

        if (isAddingMarker && latLng) {
          // 마커 추가 모드일 때만 실행
          const markerNumber = markerCount.current + 1; // 현재 마커 번호
          const customIcon = {
            content: `
              <div style="width: 30px; height: 30px; border-radius: 50%; 
                          background-color: #007bff; display: flex; 
                          align-items: center; justify-content: center; 
                          color: white; font-weight: bold; font-size: 12px;">
                ${markerNumber}
              </div>`,
            size: new naver.maps.Size(30, 30), // 아이콘 크기
            anchor: new naver.maps.Point(15, 15), // 아이콘 앵커 포인트
          };

          // 새로운 마커를 추가
          const newMarker = new naver.maps.Marker({
            position: latLng, // 마커 위치
            map: mapRef.current, // 마커가 추가될 지도
            title: `마커 위치: ${latLng.lat()}, ${latLng.lng()}`, // 마커 제목
            icon: customIcon, // 사용자 정의 아이콘
          });

          // 마커 배열에 추가
          markers.current.push(newMarker); // 새 마커를 배열에 추가
          markerCount.current += 1; // 마커 개수 증가

          // 이전 마커가 있을 경우 선을 그리기
          if (markers.current.length > 1) {
            const previousMarker = markers.current[markers.current.length - 2]; // 이전 마커
            const polyline = new naver.maps.Polyline({
              path: [previousMarker.getPosition(), newMarker.getPosition()], // 이전 마커와 현재 마커를 연결하는 경로
              map: mapRef.current, // 선을 그릴 지도
              strokeColor: "#FF0000", // 선 색상
              strokeOpacity: 0.8, // 선 불투명도
              strokeWeight: 3, // 선 두께
            });
            polylines.current.push(polyline); // 폴리라인 배열에 추가
          }
        }
      });
    };

    // Naver Maps API가 로드되었는지 확인하는 타이머 설정
    const checkNaverMap = setInterval(() => {
      if (window.naver) {
        clearInterval(checkNaverMap); // API가 로드되면 타이머 종료
        loadMap(); // 지도 로드
      }
    }, 100); // 100ms마다 확인

    return () => clearInterval(checkNaverMap); // 컴포넌트 언마운트 시 타이머 정리
  }, [isAddingMarker]); // isAddingMarker 상태만 의존성으로 추가

  // 마커 추가 버튼 클릭 핸들러
  const handleAddMarkerClick = () => {
    if (isAddingMarker) {
      // 마커 추가 모드를 중지할 때
      markers.current.forEach((marker) => marker.setMap(null)); // 모든 마커 제거
      polylines.current.forEach((polyline) => polyline.setMap(null)); // 모든 선 제거
      markers.current = []; // 마커 배열 초기화
      polylines.current = []; // 폴리라인 배열 초기화
      markerCount.current = 0; // 마커 개수 초기화
    }

    setIsAddingMarker((prev) => !prev); // 버튼 클릭 시 마커 추가 모드 토글
    console.log("Toggling marker adding mode:", !isAddingMarker); // 현재 모드 출력
  };

  return (
    <div>
      <button onClick={handleAddMarkerClick}>
        {isAddingMarker ? "마커 추가 중지" : "마커 추가 시작"}{" "}
        {/* 버튼 텍스트 변경 */}
      </button>
      <div id="map" style={{ width: "50%", height: "400px" }} />{" "}
      {/* 지도 표시 */}
    </div>
  );
};

export default BoardMap; // 컴포넌트 내보내기
