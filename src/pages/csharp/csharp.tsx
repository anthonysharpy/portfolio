export function CSharpPage() {
    return (
        <>
            <p>If you want to jump straight to a simple example of the sort of C# code I can write, see here: <a href="https://github.com/anthonysharpy/battleships" target="_blank">https://github.com/anthonysharpy/battleships</a>.</p>
            <p>Please see my <a href="/files/Anthony Sharp - CV September 2023.pdf" target="_blank">CV</a> for a quick run-down of the kinds of commercial experience I have with C#.</p>
            <p>I started using C# back in 2014. Unity is what got me into it. The rest of this is just going to be me talking about some of the personal projects I've done in C# 😁</p>
            <h2>Blazor Server dashboard site</h2>
            <p>Below you can see a demonstration of a Blazor Server dashboard website I put together in a weekend. It's designed to be a hypothetical example of how you could use Blazor Server to create an internal dashboard for a company. You can find the code for it here: <a href="https://github.com/anthonysharpy/blazor-dashboard" target="_blank">https://github.com/anthonysharpy/blazor-dashboard</a>.</p>
            <video controls><source src="videos/blazor_site_1.mp4"/></video>
            <h2>S&box City</h2>
            <p>S&box City is a gamemode I've been working on for over a year now developed in the s&box games engine. The entire thing is pretty much coded from scratch, including the players, vehicles, NPCs, weapons, entities, persistence, etcetera, although I have borrowed a bit of code from the makers of the engine here and there.</p>
            <p><i>"Is this really something that shows off your C# skills?"</i>. I mean - sure - it's not <i>"This is my example of a basic REST API coded in C# using a tutorial that I found on the internet"</i>. But I would say the answer is definitely yes! Here's why:</p>
            <ul>
                <li>I've been working on it for over a year now - that shows super-duper work ethic!</li>
                <li>The codebase has grown to be tens of thousands of lines long and has 200+ code files, which has required good project management skills.</li>
                <li>The game has lots of complex and interdependent parts, like networking calls, dynamically loaded and unloaded entities, data storage, etc - if just one thing breaks, the whole experience is ruined; this requires a good eye for quality control.</li>
                <li>The game engine (s&box) is still very early in development, so I have often had to find clever workarounds for things (Just like in the real world!).</li>
                <li>I try to follow a steady release cycle for the gamemode (Just like you do with code in the real world!).</li>
            </ul>
            <p>Better to show you than talk at you... these are only ~10% of the actual features; the only overview video there is has too much rude language in it! Sorry!</p>
            <p className="caption">Self-driving cars (don't worry they're intentionally goofy)</p>
            <video controls><source src="videos/lamerp6.mp4"/></video>
            <p className="caption">Achievements</p>
            <video controls><source src="videos/lamerp5.mp4"/></video>
            <p className="caption">Taser weapon</p>
            <video controls><source src="videos/lamerp2.mp4"/></video>
            <p className="caption">Saved player data - e.g. bank balances</p>
            <video controls><source src="videos/lamerp4.mp4"/></video>
            <p className="caption">Handcuffs</p>
            <video controls><source src="videos/lamerp3.mp4"/></video>
            <p className="caption">Destructible doors</p>
            <video controls><source src="videos/lamerp1.mp4"/></video>
            <h2>Graphical coding system</h2>
            <p>Something cool I made back in 2017 was this graphical programming system for a game I was working on. Yes, I know 2017 was a really long time ago (Brexit hadn't even happened yet!), but I just think it's really cool!</p>
            <p>Basically you would add functions to the flying droid (let's call them "nodes"). Some of these nodes were logical primitives like "and", "or", "not", etcetera. Others would allow the droid to interact with the world - for example, there's one called GetClosestEnemy. Once you programmed the droid by joining all the nodes together, it performed the actions as instructed. For this I had to make a routine that would parse the graph and perform all the logic on it, which was actually quite fun.</p>
            <img className="styled-image" src="images/graphical_programming_2.png"></img>
            <img className="styled-image" src="images/graphical_programming_1.jpg"></img>
            <p>Another cool thing I did for that game was write some code that would chop meshes in half along a plane:</p>
            <img className="styled-image" src="images/mesh_cut_in_half.png"></img>
        </>
    )
}