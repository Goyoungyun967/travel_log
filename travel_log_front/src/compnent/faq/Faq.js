import axios from "axios";
import { useEffect, useState } from "react";

const Faq = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const [faqList, setFaqList] = useState([]);    
    return (
        <section className="faq-section">
            <div className="faq-warp">
                
            </div>
        </section>
    );
}

export default Faq;