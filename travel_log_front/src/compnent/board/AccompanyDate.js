import { useEffect, useState } from "react";

const AccompanyDate = (props) => {
  const daysDifference = props.daysDifference;
  const accompanyContent = props.accompanyContent;
  const setAccompanyContent = props.setAccompanyContent;

  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    if (daysDifference > 0) {
      const initialItinerary =
        accompanyContent.length === daysDifference
          ? accompanyContent
          : new Array(daysDifference).fill("");
      setItinerary(initialItinerary);
      setAccompanyContent(initialItinerary);
    } else {
      setItinerary([]);
    }
  }, [daysDifference, accompanyContent, setAccompanyContent]);

  const handleItineraryChange = (index, event) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = event.target.value;
    setItinerary(newItinerary);
    setAccompanyContent(newItinerary);
  };

  return (
    <div>
      <div className="accompany-map-title">
        <h4>동행 일정</h4>
      </div>
      <div>
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
    </div>
  );
};

export default AccompanyDate;
