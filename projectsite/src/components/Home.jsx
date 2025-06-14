import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
	return (
		<>
			<h2>Overview</h2>
			<p>
				SatelLights is a data physicalization that aims to bring some of
				nature back into everyday life in the city. Generally, you can't
				see the stars in Worcester due to light pollution. This
				installation displays what would be seen in the night sky onto a
				ceiling, aiming to provide at least a little bit of the same
				experience and inspiration.
			</p>
			<h2>Intended Audience</h2>
			WPI students (especially those living in my apartment) tend to be
			very stressed. Going out in nature and being reminded of the larger
			world often helps with this, but it's something one must actively
			choose to do (and is also difficult in a city). This installation
			aims to be a reminder to appreciate it even so.
			<img src={"/satelights/working_lights.png"} />
			<p>
				As seen above, it consists of rows of RGB LED strings, that can
				be individually controlled. As such, the night sky can be
				projected and dynamically updated based on user input. (I
				promise it's much more pretty in person.)
			</p>
			<p>
				This input can be given though two applications, SatelSITE and
				sAPPellite, seen below. The former is a website through which
				you can control the display, and the second is a mobile
				application that offers the same functionality. Both enable the
				user to send "what direction am I looking" data to the system,
				where it can update accordingly.
			</p>
			<video
				src={"/satelights/site.MOV"}
				controls="controls"
			/>
			<video
				src={"/satelights/app.mp4"}
				controls="controls"
			/>
			<p>
				Both communicate over the network, with the idea being that both
				can connect from their mobile device (provided they're on
				the same wifi network as the system) and control it.
			</p>
			<p>
				The system they are controlling is 3D model of most visible
				stars, the planets of the solar system, and a number of orbiting
				satellites. This data is updated in real time, so the display
				shows a model of the sky as it would be visible from your
				position.
			</p>
			<p>
				Below is a video showing the systeml with the camera moved so
				you can see the earth and viewer. The viewer is shown as an
				orange rectangle, the planets are purple blobs, and the stars are
				white cubes. For visibility once going through the
				img-to-LED-matrix algorithm the stars and planets are only a
				fourth of their actual distance, but the system is originally
				designed to have accurate distances between all objects.
			</p>
			<video
				src={"/satelights/spacemodel.MOV"}
				controls="controls"
			/>
			<p>
				This img then has a <i>lot</i> of math done to it to get it
				into a format the lights controller can use.
			</p>
			<p>
				This data then gets sent over the network to the lights
				controller, which outputs it to the display. Below is the LED
				matrix as I pan and tilt the view around, to look at stars in
				different directions. The color coding is the same as for the
				space model.
			</p>
			<video
				src={"/satelights/matrix.mp4"}
				controls="controls"
			/>
			<p>
				The framerate is unfortunately a little low, but it's been
				faster when the Raspberry Pi it's running on isn't also
				listening for network communications. This is still something
				I am working on.
			</p>
			<p>
				Below is the project presentation for it if you're interested,
				thank you for reading!
			</p>
			<h2>Project Presentation</h2>
			<video
				src={"/satelights/final_pres_final.mp4"}
				controls="controls"
			/>
		</>
	);
}
