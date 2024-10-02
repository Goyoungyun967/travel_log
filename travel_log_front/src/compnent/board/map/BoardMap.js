import React, { useEffect, useRef, useState } from "react";

const BoardMap = (props) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const mapRef = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=eef52b7c2be400520af4dc7b24836680&libraries=services&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(38.2313466, 128.2139293),
          level: 1,
        };
        mapRef.current = new window.kakao.maps.Map(container, options);

        // 초기 마커 설정
        const markerPosition = new window.kakao.maps.LatLng(
          38.2313466,
          128.2139293
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(mapRef.current);
      });
    };
  }, []);

  const searchPlaces = () => {
    // 카카오 API가 로드된 후에만 실행
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert("지도를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    if (!search.trim()) {
      alert("키워드를 입력해주세요!");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, placesSearchCB);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
      const bounds = new window.kakao.maps.LatLngBounds();
      data.forEach((place) => {
        displayMarker(place);
        bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
      });
      mapRef.current.setBounds(bounds);
    } else {
      alert(
        status === window.kakao.maps.services.Status.ZERO_RESULT
          ? "검색 결과가 존재하지 않습니다."
          : "검색 결과 중 오류가 발생했습니다."
      );
    }
  };

  const displayMarker = (place) => {
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", () => {
      props.setAddress(place);
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      infowindow.setContent(`<span>${place.place_name}</span>`);
      infowindow.open(mapRef.current, marker);
      mapRef.current.panTo(new window.kakao.maps.LatLng(place.y, place.x));
    });

    markers.current.push(marker);
  };

  const displayPlaces = (places) => {
    const listEl = document.getElementById("placesList");
    removeAllChildNodes(listEl);
    removeMarker();

    const fragment = document.createDocumentFragment();
    places.forEach((place, index) => {
      const itemEl = getListItem(index, place);
      fragment.appendChild(itemEl);
    });

    listEl.appendChild(fragment);
  };

  const getListItem = (index, place) => {
    const el = document.createElement("li");
    el.className = "item";
    el.innerHTML = `
      <span class="markerbg marker_${index + 1}"></span>
      <div class="info">
        <h5>${place.place_name}</h5>
        ${
          place.road_address_name
            ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>`
            : `<span>${place.address_name}</span>`
        }
        <span class="tel">${place.phone || "정보 없음"}</span>
      </div>
    `;
    return el;
  };

  const removeMarker = () => {
    markers.current.forEach((marker) => marker.setMap(null));
    markers.current = [];
  };

  const removeAllChildNodes = (el) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchPlaces();
  };

  return (
    <div className="map_wrap" style={{ display: isOpen ? "block" : "none" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>

      <div id="menuDiv">
        <div id="menu_wrap" className="bg_white">
          <div className="option">
            <div>
              <div id="map_title">
                <div>주소 검색</div>
              </div>

              <div id="form">
                <input
                  type="text"
                  value={search}
                  id="keyword"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button id="submit_btn" type="submit" onClick={handleSearch}>
                  검색
                </button>
              </div>
            </div>
          </div>

          <ul id="placesList"></ul>
          <div id="pagination"></div>
        </div>

        <div id="btnDiv">
          <div id="btnOn">
            <button
              id="searchBtn"
              onClick={() => setIsOpen(!isOpen)}
              type="button"
            >
              {isOpen ? "접기" : "펼치기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardMap;
