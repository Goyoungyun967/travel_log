import React, { useEffect, useRef, useState } from "react";

const { kakao } = window;

const BoardMap = () => {
  const container = useRef(null); // 지도 컨테이너 접근
  const [address, setAddress] = useState(""); // 사용자가 입력한 주소
  const [results, setResults] = useState([]); // 주소 검색 결과
  const [map, setMap] = useState(null); // 지도 상태 저장
  const [isMarkerMode, setIsMarkerMode] = useState(false); // 마커 추가 모드 상태
  const [markers, setMarkers] = useState([]); // 생성된 마커 배열
  const [line, setLine] = useState(null); // 마커 간 연결 선 상태
  const [labels, setLabels] = useState([]); // 레이블 상태 저장

  useEffect(() => {
    const mapOptions = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치 (제주도)
      level: 3, // 기본 확대 레벨
    };
    const newMap = new kakao.maps.Map(container.current, mapOptions); // 지도 생성
    setMap(newMap); // 지도 상태 저장

    // 사용자가 입력한 주소를 검색하고 결과를 표시
    const geocoder = new kakao.maps.services.Geocoder();
    const searchAddress = (inputAddress) => {
      if (inputAddress) {
        geocoder.addressSearch(inputAddress, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setResults(result); // 검색 결과 저장
          } else {
            setResults([]); // 결과가 없으면 비워둠
          }
        });
      } else {
        setResults([]); // 입력값이 없으면 결과 비워둠
      }
    };

    // 주소 입력값이 변경될 때마다 주소 검색
    searchAddress(address);
  }, [address]);

  // 주소 클릭 시 해당 주소로 지도 이동
  const handleAddressSelect = (selectedAddress) => {
    setAddress(selectedAddress); // 선택한 주소 설정
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(selectedAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        // 선택한 주소로 중심 이동
        map.setCenter(coords);
      }
    });
  };

  // 마커 추가 모드 토글
  const toggleMarkerMode = () => {
    setIsMarkerMode((prev) => !prev);
  };

  // 지도 클릭 시 마커 추가
  const handleMapClick = (event) => {
    if (isMarkerMode) {
      const coords = new kakao.maps.LatLng(
        event.latLng.getLat(),
        event.latLng.getLng()
      );

      const marker = new kakao.maps.Marker({
        position: coords,
        map: map, // 마커 표시
      });

      // 마커 레이블 생성
      const labelContent = document.createElement("div");
      labelContent.innerText = markers.length + 1; // 숫자 표시
      labelContent.style.color = "#000";
      labelContent.style.fontWeight = "bold";
      labelContent.style.backgroundColor = "white";
      labelContent.style.padding = "5px";
      labelContent.style.borderRadius = "5px";
      labelContent.style.textAlign = "center";

      // 레이블을 약간 오른쪽으로 위치 조정
      const labelOverlay = new kakao.maps.CustomOverlay({
        position: coords,
        content: labelContent,
        yAnchor: 1, // 레이블의 수직 기준점
        xAnchor: 0.5, // 레이블의 수평 기준점 (가운데)
      });

      // 마커 추가
      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, marker];

        // 레이블 추가
        setLabels((prevLabels) => [...prevLabels, labelOverlay]);

        // 선 연결 로직
        if (updatedMarkers.length > 1) {
          if (!line) {
            const newLine = new kakao.maps.Polyline({
              path: updatedMarkers.map((m) => m.getPosition()), // 모든 마커의 위치를 경로로 설정
              strokeWeight: 2,
              strokeColor: "#FF0000",
              strokeOpacity: 1,
              strokeStyle: "solid",
            });
            newLine.setMap(map); // 선을 지도에 표시
            setLine(newLine); // 선 상태 저장
          } else {
            line.setPath(updatedMarkers.map((m) => m.getPosition())); // 선의 경로 업데이트
          }
        }

        labelOverlay.setMap(map); // 레이블 표시
        return updatedMarkers; // 업데이트된 마커 배열 반환
      });

      toggleMarkerMode(); // 마커 추가 후 마커 모드 해제
    }
  };

  // 마커 리셋 함수
  const resetMarkers = () => {
    // 생성된 마커를 제거
    markers.forEach((marker) => {
      marker.setMap(null); // 마커 지도에서 제거
    });
    // 생성된 레이블을 제거
    labels.forEach((label) => {
      label.setMap(null); // 레이블 지도에서 제거
    });
    // 선을 제거
    if (line) {
      line.setMap(null); // 선 지도에서 제거
    }
    // 상태 초기화
    setMarkers([]); // 마커 상태 초기화
    setLabels([]); // 레이블 상태 초기화
    setLine(null); // 선 상태 초기화
  };

  // 지도 클릭 이벤트 리스너 추가
  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, "click", handleMapClick); // 클릭 이벤트 추가
    }
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, "click", handleMapClick);
      }
    };
  }, [map, isMarkerMode]);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
      {/* 주소 입력 폼 */}
      <div style={{ flex: "1" }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // 주소 입력 시 상태 업데이트
          placeholder="지역을 입력하세요"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {/* 주소 검색 결과 */}
        <div
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
          }}
        >
          {results.map((result) => (
            <div
              key={result.address_name}
              onClick={() => handleAddressSelect(result.address_name)} // 주소 선택 시 지도 이동
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                backgroundColor: "#f9f9f9",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1f1f1")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
            >
              {result.address_name}
            </div>
          ))}
        </div>

        {/* 마커 추가 및 리셋 버튼 */}
        <div style={{ marginTop: "10px" }}>
          <button
            type="button" // 버튼 타입을 "button"으로 설정하여 서브밋 방지
            onClick={toggleMarkerMode}
            style={{
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: isMarkerMode ? "#f44336" : "#4caf50",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {isMarkerMode ? "마커 추가 모드 종료" : "마커 추가 모드 활성화"}
          </button>
          <button
            type="button" // 버튼 타입을 "button"으로 설정하여 서브밋 방지
            onClick={resetMarkers}
            style={{
              marginTop: "10px",
              padding: "8px",
              width: "100%",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#2196F3",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            마커 리셋
          </button>
          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "10px",
              color: "#888",
            }}
          >
            지도는 캡쳐해서 첨부 파일에 넣어주세요.
          </p>
        </div>
      </div>
      {/* 카카오 지도 */}
      <div
        ref={container}
        style={{
          width: "75%",
          height: "500px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default BoardMap;
