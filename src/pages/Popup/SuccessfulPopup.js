import { useEffect } from "react";
import './styles/SuccessfulPopup.css';

function SuccessfulPopup({ trigger, setTrigger, message }) {
    useEffect(() => {
        setTimeout(() => setTrigger(false), 4000);
    });

    return trigger ? (
        <div className="successfulPopup">
            <div className="successfulPopup__inner">
                <div className="successfulPopup__inner--success-checkmark">
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>

                <div>
                    <h2 className="successfulPopup__inner--heading-2">
                        {message}
                    </h2>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
}

export default SuccessfulPopup;
