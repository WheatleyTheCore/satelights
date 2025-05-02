import "bootstrap/dist/css/bootstrap.css";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
                    paddingBottom: "40px",
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
                    <h1>Process Book!</h1>

                    <h2>Overview and motivation</h2>
                    <p>
                        Around december of 2024 I got the urge to build
                        something big. It had been a while since I'd made
                        anything for fun, and I decided I wanted to put an LED
                        matrix on my living room ceiling as a fun alternate
                        light source for the room. Then, as I was remembering a
                        tour of JPL I had been on the previous summer I
                        remembered how taken I was with Daniel Brusby's{" "}
                        <a
                            style={{ display: "inline" }}
                            href="https://danielbusby.com/pulse/"
                        >
                            pulse
                        </a>
                        sculpture, which showed communication data between a
                        particular space probe and its ground station. Thus, I
                        decided I wanted my lights to be space-themed too, and
                        so I decided I wanted them to show satellite data (hence
                        the name).
                        <iframe
                            width="1140"
                            height="658"
                            src="https://www.youtube.com/embed/LjLqWoWXRQc"
                            title="Mini Pulse Testing"
                            frameborder="0"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </p>

                    <p>
                        So I learned about propegating sattelite orbits and
                        about keplerian elements and everything else I needed
                        from Alfonso Gonzalez's incredible{" "}
                        <a href="https://www.youtube.com/@alfonsogonzalez-astrodynam2207">
                            youtube channel
                        </a>{" "}
                        and then started to work. Following his lead I worked in
                        matlab, and got a 3d model and animated matrix (to show
                        to 2D projection that would go on the ceiling) graph
                        working.
                    </p>

                    <Image src="/matlab_attempt.png" width={800} height={400} />

                    <p>
                        That's as far as I got before getting super busy again,
                        and I didn't work on it for months. But then I started
                        my Data Visualization course at WPI and I could maybe do
                        it for credit, which I thought was a great opportunity
                        to actually get something done.
                    </p>

                    <p>
                        When starting my second attempt, I realized there were a
                        few main problems to solve:
                    </p>
                    <ol>
                        <li>
                            I had to somehow keep a model of all the stuff I
                            wanted to display
                        </li>
                        <li>
                            I had to do some evil camera math to get the picture
                            to put on the LEDs
                        </li>
                        <li>
                            I had to somehow turn this picture into data for the
                            LEDs
                        </li>
                        <li>
                            I had to have some sort of hardware to actually
                            control the LEDs
                        </li>
                    </ol>

                    <p>
                        At first I wanted to try to get this working on a single
                        ESP32 with only satellite data becuase I love putting
                        cool stuff on tiny systems, but time constraints put
                        that notion out of my head.
                    </p>
                    <p>
                        So then I figured I'd just start out by getting
                        something working on my computer. Not having much
                        graphics experience I figured the easiest thing to do
                        would be to model stuff in NumPy, and then figure out
                        the camera projections later. Then, once I started
                        actually looking into camera projection math, I decided
                        it would definitely be faster to find a system that
                        handles that for me.
                    </p>

                    <p>
                        So then I started working with React Three Fiber, and
                        got a simple visualization of stars working modeled
                        after{" "}
                        <a href="https://www.math.uwaterloo.ca/tsp/star/hyg_tour.html">
                            {" "}
                            Waterloo University's HYG109399 Project
                        </a>
                        . This was my first introduction to the HYG dataset,
                        which was the star dataset I used in this project. There
                        are a few other options, but this one is a combination
                        of most of the larger other options. I couldn't find
                        source code for Waterloo's tour examples, but by reading
                        the page source I was able to figure out how it worked
                        and recreate it (with a slightly different star dataset,
                        as I filtered mine by magnitude instead of distance so
                        that only visible stars would be included).
                    </p>
                    <video
                        src={"simplestars.mp4"}
                        width="800"
                        height="800"
                        controls="controls"
                    />
                    <p>
                        So then I started looking into a million types of
                        graphics software, with a requirement that it had to be
                        in python since I wanted to go fast (and my C/C++ for
                        non-embedded systems is not as strong). The main things
                        I looked into were{" "}
                        <a href="https://www.pygame.org/news">PyGame</a> (which
                        doesn't support 3D by default),{" "}
                        <a href="https://pyopengl.sourceforge.net/">PyOpenGl</a>{" "}
                        (which paired with pygame can do 3D),
                        <a href="https://www.panda3d.org/">Panda3D</a> which I
                        thought seemed like too much to learn with too little
                        documentation, and{" "}
                        <a href="https://www.ursinaengine.org/">Ursina</a> ,
                        which seemed very similar to Threejs, and was the one I
                        went with. (I'd later learn that Ursina is build on
                        Panda3D and actually has worse documentation. I had to
                        do a lot of hacking around the engine's limitations, and
                        so I ended up learning Panda3D anyways coincedentally.)
                        I nixed matplotlib as it didn't handle animation as
                        well.
                    </p>

                    <p>
                        Concurrently, as I was figuring out which 3D library to
                        use, I was also desperately trying to figure out how I'd
                        get images out of the program. Most of these libraries
                        (with the exception of PyOpenGL) handle pixel matrix
                        stuff for you, and don't offer many great ways to get
                        the image written back out to the program for further
                        processing. I considered writing a shader, but it needed
                        to be something running on the CPU since it had to also
                        communicate with the lights. I tried a number of
                        libraries like{" "}
                        <a href="https://pypi.org/project/selenium/">
                            PySelenium
                        </a>{" "}
                        or{" "}
                        <a href="https://github.com/asweigart/pyautogui">
                            PyAutoGUI
                        </a>{" "}
                        that "drive" the computer for you and let you take
                        screenshots, but none could get any faster than 15 fps
                        on my laptop, which was way too slow. I didn't figure
                        out a solution to this problem until later.
                    </p>

                    <p>
                        I then tackled wiring the LED strings and setting up the
                        hangers for them. I put 12 rows of plastic sticky hooks
                        on the ceiling, as seen below, to hang the lights and
                        power wires on.
                    </p>

                    <Image src="/hooks.jpg" width={800} height={400} />
                    <p> These hooks took two entire evenings to put up.</p>

                    <p>
                        Then, since 1) I wanted to try a smaller task with the
                        same type of lights and 2) my kitchen has horrible
                        lighting, I put together some touch-activated
                        under-cabinet lighting. This got me familiar with the
                        WS2812B LED chipset, and helped me put together a
                        known-good test rig to test the rest of the lights on.
                        They are controlled by a little strip of copper tape
                        stuck to the bottom of the cabinets. Fun fact, the
                        electronics are housed in the tea box taped to the
                        bottom of one of the cabinets.
                    </p>
                    <video
                        src={"cabinets.MOV"}
                        width="800"
                        height="800"
                        controls="controls"
                    />
                    <p>
                        Then I went through the arduous process of wiring the
                        LED matrix. I did this by first setting up a test rig on
                        an old Raspberry Pi. Then I took my three 20-meter
                        lengths of led strings (purchased online), and cut them
                        into 12 16-ft segments. I then went through and tested
                        them, marking which side I found to be data-in. Having
                        previously calculatted the maximum wattage the system
                        could draw in normal functioning, I got 14-gauge wire to
                        do current injection at each end of each row. I set this
                        power cable up in two lines, and then stripped small
                        segments of it every foot (since the rows of lights were
                        a foot apart). I then soldered all the power
                        connections, and chained the data lines together so that
                        the data-out of one string went to the data-in of the
                        next. (Note: due to the nature of these strings, without
                        some evil long-range data transmission cables and
                        attenuation prevention, the direction of the lights is
                        in a zig zag pattern, which has to be accounted for when
                        creating the display code.)
                    </p>
                    <p>
                        After each added string of lights I tested a little
                        "flash red" program I had to make sure data was making
                        it thorugh the system okay and that there weren't any
                        issues. Below is a photo of that. The soldering process
                        was probably the longest part of the process
                    </p>
                    <Image src="/soldering.png" width={600} height={800} />

                    <Image src="/power_supply.png" width={800} height={600} />

                    <p>
                        Above is the 40W power supply that drives the system,
                        powering the lights through the two large wires coming
                        out (there are two since one may be insufficent at high
                        current draws), a raspberry pi, and a little circuit
                        that does logic-level shifting from the Pi's 3.3V to the
                        LED strip's 5V. This may actually be unnecessary, but at
                        one point I couldn't get one of the strings to light and
                        I thought signal attenuation could be the issue.
                        Unfortuantely, it was actually just that there was some
                        sort of internal short that killed it. (As such, it
                        became a 12 by 98 pixel display to an 11 by 98 pixel
                        display.)
                    </p>

                    <p>
                        Once I had the soldering done, I hung the lights up and
                        tested them. Surprisingly, they worked without much
                        issue.
                    </p>

                    <Image src="/lightstest.png" width={800} height={600} />

                    <p>
                        Then, I continued work on the ursina program. I write
                        the stars into the system as single entity with a vertex
                        for each star, and a little cube at each vertex.
                        Functionally, it's the same as a particle system. This
                        keeps it relatively efficient to put in, however due to
                        the number of verticies I opted not to make them move as
                        that would be computationally expensive, and at the time
                        I still wanted to run this whole system on a Raspberry
                        Pi. The sattelites were put in using the{" "}
                        <a href="https://rhodesmill.org/pyephem/quick.html">
                            PyEphem
                        </a>{" "}
                        library. During the implementation of the planets I
                        realized there was a more updated library called{" "}
                        <a href="https://rhodesmill.org/skyfield/">Skyfield</a>,
                        which I then went back and converted some of the
                        previous things I implemented to.{" "}
                    </p>
                    <Image src="/ursina.png" width={800} height={600} />
                    <p>
                        Here, I have the pink sattelites, purple planets, two
                        lines showing north and 0 degrees lat and lon. Based on
                        these I could figure out what math needed to be done to
                        place someone at WPI (orange line), and also convert
                        polar coordinates to rectangular ones in Ursina (which
                        is difficult because it uses coordinates that are in a
                        different order and some (but only some) are flipped
                        compared to the math world). This was a cause of great
                        pain. You may also notice that there are not as many
                        satellites in the sky as you'd expect. This is because
                        many of the TLE elements from the NORAD API I was using
                        were pretty old (aside from popular satellites like the
                        ISS) and PyEphem requires them to be within a week or
                        so. This is another thing I plan to go back and fix.
                    </p>

                    <p>
                        I then went on a slight diversion since I wanted to add
                        more interactivity, making web and mobile control interfaces I call satelSite and sAppelite. I won't go too in-depth with the
                        details but to say the website controller code reused a
                        lot of the graphics code from my orignial Three attempt,
                        and the other one was built with React Native and loaded
                        onto my phone using Expo
                    </p>
                    <video
                        src={"app.mp4"}
                        width="800"
                        height="800"
                        controls="controls"
                    />
                    <video
                        src={"site.MOV"}
                        width="800"
                        height="800"
                        controls="controls"
                    />

                    <p>
                        I added a thread in the main simulation code for a
                        websocket server to get directional data from
                        peripherals. I also tried using shared memory for faster
                        performance, but unfortunately there was too much
                        overhead to get that working in a reasonable amount of
                        time. You can see this working by the direction data
                        moving the orange line (which is the observer, and is
                        simply replaced with a camera object in the second
                        video) and the camera in the second video. The app uses
                        your phone's IMU data to simulate stargazing apps, and
                        the site just uses drag controls. I had tried to get
                        mobile IMU data working for the web interface too, and
                        was able to get accelerometer data through the{" "}
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Accelerometer">
                            experiemental web sensors api
                        </a>
                        , but couldn't get magnetometer data, which is needed to
                        properly orient the directional data from the
                        accelerometer.
                    </p>
                    <p>
                        And then came the evil of getting image data back from
                        the GPU/display and into the CPU's domain. This..... was
                        absolutely horrible. Through a sacrifice of a million
                        hours and a portion of my sanity (and reading thorugh a
                        lot of the Panda3D docs and Ursina source code) I was
                        able to learn that you can take a screenshot into a
                        texture object and then get the data from the RAM from
                        that object and then you have to do some
                        incomprehensible wizardry to in order to get it into a
                        recognizable shape. Once I had that working, the
                        colorspace was mixed up and the image was flipped
                        vertically, which were still a bit of a pain to figure
                        out since it meant trying permutations of the RGB
                        channels. (The alpha channel was also in the wrong place
                        for anything else I know about to use it, but that was
                        relatively easy to figure out).
                    </p>

                    <p>
                        Once that was working, I had to get the alorithm to turn
                        the image into a stream of rgb data for the leds, with
                        each 98-pixel segement being flipped since they are
                        wired in the aformentioned zigzag pattern. This was
                        relatively simple, however. In short, I just iterate
                        over columns of cells, figure out what the nearest
                        object in said cell is, and make that cell's
                        corresponding matrix pixel's color the color of said
                        nearest object. Sort of like convolution, but without
                        the overlapping and in column-first direction, but also
                        using a flipped version of the picture every other
                        column.
                    </p>

                    <p>
                        Then, I tried putting it all on the Pi and running it.
                        This required messing with some python permissions in
                        order to get it to play nicely with the led driver
                        library (which requires root privelages), but otherwuise
                        worked first try. Alas, the concurrent web socket thread
                        and postprocessing math for conversion to led-strip data
                        slowed it down too much. I believe this is solvable, but
                        not within the time of this project.
                    </p>

                    <p>So I pivoted to a system of three entities. There is the directional data from some external sensor (e.g. the app) which defaults to "up" if there's no websocket data, there's the "big compute" entity that runs the model, serves the sensor websocket server, and does the postprocessing math, and then the Raspberry Pi is just a display controller, which runs a websocket server and just writes whatever data it gets to the lights (within reason). Unfortuantely this was <i>still</i> too much  for the pi, and I suspect there's some quirk about multithreading on it I have yet to find. In any case it now performs at a more accepable speed. In fact, in non-interactive settings where the only motion is the motion of satellites and planets across the sky, it will be more than fast enough, so it satisfies my original design requirements.</p>
                    <video
                        src={"matrtix.mp4"}
                        width="800"
                        height="800"
                        controls="controls"
                    />
                </div>
                <p>Above shows the lights being controlled with the mouse control on the simulation.</p>
            
            <h3>To Dos</h3>
            <ol>
                <li>Make stars move now that we've landed on a more computationally intensive simulation model. Not all of them have to update, but the sun at least should.</li>
                <li>Add moons to planets.</li>
                <li>Get Pi to render faster.</li>
                <li>Maybe actually write a shader for the image-to-matrix math.</li>
                <li>Make app and website controllers more robust.</li>
                <li>Add low-pass filtering to mobile IMU measurements to smooth shakiness.</li>
                <li>Cannibalize an old laptop or something to serve as a dedicated simulation server.</li>
            </ol>
            </div>
        </>
    );
};

export default Slides;
