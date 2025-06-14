import { useState } from "react";
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Slides from "./components/Slides";
import Processbook from "./components/Processbook";
import './App.css';

function App() {
	const [navItem, setNavItem] = useState(0);

	return (
		<>
			<Navbar setNavItem={setNavItem} />

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<div
					style={{
						maxWidth: "900px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: "10px",
					}}
				>
					{
						navItem == 0 ? <Home /> : navItem == 1 ? <Slides /> : <Processbook />
					}

				</div>
			</div>
		</>
	);
}

export default App;
