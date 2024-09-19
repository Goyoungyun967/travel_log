import axios from "axios";
import { useEffect, useState } from "react";
import "../faq/faq.css";

const Faq = () => {
    const backServer = process.env.REACT_APP_BACK_SERVER;
    const [faqList, setFaqList] = useState([]);    
    return (
        <section className="faq-section">
            <div className="faq-warp">
                <div className="faq-side-menu">
                    <ul>
                        <li>호텔</li>
                    </ul>
                    <ul>
                        <li>커뮤니티</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Faq;