import "./managerSuccessPage.css";
import pop from "../../assets/pop.png";
const SuccessPage = () => {
    return (
        <>
            <div className="Container">
                <div className="Box">
                    <img className="successImg" src={pop} alt="" />
                    <h1 className="successText">
                        Enregistrement d’employer réussi !!
                    </h1>
                    <div className="returnButton">
                        <button type="submit">Retourner</button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default SuccessPage;
