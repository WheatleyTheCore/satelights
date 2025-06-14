import "bootstrap/dist/css/bootstrap.css";

const Navbar = ({ setNavItem }) => {
	return (
		<div class="data-bs-parent">
			<nav class=" navbar navbar-expand-lg">
				<a class="navbar-brand" href="/">SatelLights</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
					<ul class="navbar-nav">
						<li class="nav-item nav-link active" onClick={() => setNavItem(0)} href="/">Home</li>
						<li class="nav-item nav-link active" onClick={() => setNavItem(2)} href="/processbook">Process Book</li>
						<li class="nav-item nav-link active" onClick={() => setNavItem(1)} href="/slides">Project Slideshow</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar
