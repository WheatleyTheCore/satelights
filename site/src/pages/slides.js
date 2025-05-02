import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/components/Navbar";

const Slides = () => {
    return (
        <>
            <Navbar />
            <div
                style={{
                    minWidth: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        maxWidth: "1000px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <iframe
                        src="https://docs.google.com/presentation/d/e/2PACX-1vRhDY3WvrF6KlhCMRS7UIWnb-02xrMHB5VW605CjcpEpUBQzA5yKCfEPAU0dldQe7zh0VZ3K3CnRKKB/pubembed?start=false&loop=false&delayms=3000"
                        frameborder="0"
                        width="960"
                        height="569"
                        allowfullscreen="true"
                        mozallowfullscreen="true"
                        webkitallowfullscreen="true"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default Slides;
