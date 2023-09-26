export function ReactPage() {
    return (
        <>
            <p>This website is built in React; here it is: <a href="https://github.com/anthonysharpy/portfolio" target="_blank">https://github.com/anthonysharpy/portfolio</a> 😁</p>
            <p>I actually have more commercial experience using Angular, but since React is a lot more common, React it was! However, I worked for a year with Angular (7 I think it was). Here are some examples of the sort of things I worked on:</p>
            <ul>
                <li><a href="https://quotes.insuremystuff4less.com/static/caravan" target="_blank">https://quotes.insuremystuff4less.com/static/caravan</a></li>
                <li><a href="https://quotes.insuremystuff4less.com/taxi/vehicle" target="_blank">https://quotes.insuremystuff4less.com/taxi/vehicle</a></li>
            </ul>
            <p>Obviously not all of that was made by me, and it's changed slightly since I worked there (but not much).</p>
            <h2>Site layout</h2>
            <p>I opted for a single-page website since not only is this much simpler, but it also makes the site feel more responsive (And unique!). This probably isn't a good idea for more complicated sites, since downloading and rendering the whole thing at once could make the initial page load too long. Also, having everything on one page also likely harms search-engine optimisation, and makes it impossible to share a page with someone else by copy-pasting the URL. But it works nicely on simple sites like mine.</p>
            <p>I wanted a simple and modern layout that was easy to navigate and that conveyed an upbeat and positive message, whilst also being unique and a bit show-offy.</p>
            <h2>Tech decisions</h2>
            <p>The background animations are created from scratch using React Three Fiber, which is a React wrapper around the three.js graphics library. In hindsight it would have been better just to use three.js natively; Fiber requires that the scene is re-generated every time you add or remove an object (there are probably ways around this, but this is not really something I felt like it was worth spending days and days on).</p>
            <p>I wrote the site using TypeScript instead of plain JavaScript. The reason for this was simply to prove I could do it! Other than that, it actually made it much more difficult because I had to constantly write-out the types of everything I was using (and with the graphics library on top, that quickly got cumbersome). That being said, no doubt the rigidity that TypeScript provides is great for large or complex projects, even if it does slow you down a bit.</p>
            <p></p>
            <h2>The background</h2>
            <p>The scene in the background is dynamically generated and rendered. The scene is essentially a number of cubes spawning randomly that explode when collided with.</p>
            <p>The scene relies on a rudimentary gameplay loop that processes physics and object-specific logic. Scene state is stored in the <code>Background</code> component. All scene objects derive from a <code>SceneObject</code> base class in order to keep things uniform. For example, each object has a <code>mesh</code>, <code>velocity</code>, <code>angularVelocity</code>, <code>rotation</code> and <code>position</code>, among other characteristics. The <code>SceneObject</code> class could have been abstracted further, for example by putting physics handling in a separate physics mesh handler class, but I felt that would have been just adding unnecessary complexity given that it is such a simple scene.</p>
            <p>I created the collision logic myself. If you stare long enough you might notice that it is not perfect. That is because the cubes use a spherical collision detection algorithm instead of being simulated as true cubes. The only reason for doing it this way was simply because I thought it would be a bit overkill to spend ages implementing my own separating axis theorem algorithm. There are other anomalies too, such as the fact that angular velocity is not affected by collision, or that physics shapes jitter a bit. We do simulate things like gravity and drag, however.</p>
        </>
    )
}