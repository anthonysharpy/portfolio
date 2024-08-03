export function ReactPage() {
    return (
        <>
            <p>This website is built in React, <a href="https://github.com/anthonysharpy/portfolio" rel="noreferrer" target="_blank">here's the source code for it</a> 😁</p>
            <p>I actually have more experience using Angular, but since React is a lot more common, React it was! However, I worked for a year with Angular (version 7 I think it was). Here are some examples of the sorts of things I worked on:</p>
            <ul>
                <li><a href="https://quotes.insuremystuff4less.com/static/caravan" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/static/caravan</a></li>
                <li><a href="https://quotes.insuremystuff4less.com/taxi/vehicle" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/taxi/vehicle</a></li>
            </ul>
            <p>Obviously not all of that was made by me, and it's changed slightly since I worked there, but not much.</p>
            <p>I also used Vue.js/Laravel in a commercial setting for one and a half years, working on an internal corporate system at my last job. At my current job we utilise JavaScript, Vue and CakePHP on the frontend.</p>
            <h2>This site's layout</h2>
            <p>I opted for a single-page website since not only is this much simpler, but it also makes the site feel more responsive (And unique!). I wanted a simple and modern layout that was easy to navigate and that conveyed an upbeat and positive message, whilst also being unique and a bit show-offy. The site is optimised for desktop but has also been designed to display correctly on mobile and tablet. I chose not to minify the CSS etc since I want people to be able to see the good (and bad) design decisions I have made.</p>
            <h2>Tech decisions</h2>
            <p>The background animations are created from scratch using React Three Fiber, which is a React wrapper around the three.js graphics library. In hindsight it would have been better just to use three.js natively; Fiber adds some overhead in that it requires that the scene is re-generated every time you add or remove an object. There are probably ways around this, but this is not really something I felt like it was worth spending days and days on.</p>
            <p>I wrote the site using TypeScript instead of plain JavaScript. The downside of TypeScript is that it's much more verbose, which can slow you down a little bit (especially when dealing with something like a graphics library). That being said, the rigidity that TypeScript provides is great for large or complex projects, and personally I thought that the clarity the types provided was helpful when I was working on the physics logic (see below).</p>
            <p></p>
            <h2>The background</h2>
            <p>The scene in the background is dynamically generated and rendered. The scene is essentially a number of cubes spawning randomly (I like to pretend they're meteors) that explode into pieces when collided with.</p>
            <p>The scene relies on a rudimentary gameplay loop that processes physics and object-specific logic. Scene state is stored in the <code>SceneState</code> class. All scene objects derive from a <code>SceneObject</code> base class in order to keep things uniform. For example, each object has a <code>mesh</code>, <code>velocity</code>, <code>angularVelocity</code>, <code>rotation</code> and <code>position</code>, among other characteristics. Physics behaviour is abstracted into its own <code>CollisionHandler</code> base class which is further extended for each shape type.</p>
            <p>I created the collision logic myself. It's nothing too fancy - just a bunch of spheres and a floor. But it is kinda cool in that we get to simulate things like gravity and drag. I would have made the scene more intense, but in the end no amount of optimisation could fix the slow, interpreted, single-core disappointment that is JavaScript within any sane timeframe.</p>
        </>
    )
}