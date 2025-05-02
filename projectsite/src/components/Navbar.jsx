import "bootstrap/dist/css/bootstrap.css";

const Navbar = ({setNavItem}) => {
    return (
        <nav style={{padding: "10px"}} class=" navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">SatelLights</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <div class="nav-item nav-link active" onClick={() => setNavItem(0)}href="/">Home</div>
            <div class="nav-item nav-link active" onClick={() => setNavItem(1)}href="/slides">Project Slideshow</div>
            <div class="nav-item nav-link" onClick={() => setNavItem(2)}href="/processbook">Process Book</div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar