import { useNavigate } from "react-router-dom";

const WhileCounter = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>You can't use the website until the drive is finished.</h1>
            <br />           
            <div className="flexGrow">
                <button onClick={goBack}>Please Go Back To the Counter</button>
            </div>
        </section>
    )
}
 
export default WhileCounter;