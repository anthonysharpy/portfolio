export function CCPlusPlusPage() {
    return (
        <>
            <p>C++ was probably the first language I got into properly. Well, I say C++, but it was more like glorified monstrous spaghetti C code given that I was just a dumb kid at the time...</p>
            <p>C++ is not something I have used commercially or something I try and keep up-to-date with. But I am familiar with it and I know that some companies do use it as part of their tech stack, which is why I thought to mention it. Plus, I have done some cool things with it.</p>
            <h2>GNU Compiler Collection contributions</h2>
            <p>A few years ago I contributed some bug fixes for the GNU C++ compiler. Although it was quite arguably the hardest thing I've ever done, I won't blabber on about it at length since this is definitely one of those things that's just better to show. Feel free to see below for yourself some of the things I contributed.</p>
            <p><a href="https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93" target="_blank">https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93</a></p>
            <p><a href="https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f" target="_blank">https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f</a></p>
            <p>There was also another bug-fix which I co-authored with Jason Merrill, but I can't seem to find the commit for it (perhaps they haven't merged it in yet). But the change log entry is <a href="https://github.com/gcc-mirror/gcc/blob/36eec7995b4d53083c3ee7824bd765b5eba8b1a1/gcc/cp/ChangeLog-2021" target="_blank">here</a> if you search for my name.</p>
            <h2>Minecraft convolutional neural network bot</h2>
            <p>One super-fun project I did during COVID was to create a bot that used a convolutional feed-forward neural network to learn to play Minecraft... sort of. It trained the bot to kill as many pigs as possible in an enclosed room in a a set amount of time. The bot used a randomised evolutionary algorithm to learn. At the start of every simulation some neurons would be randomised. If the bot performed well, the changes would be kept. If it did badly, the changes were reverted. As the bot progressed, the randomisations decreased in scale, the idea being that eventually, we would only be making small tweaks to the network, rather than just scrambling it arbitrarily every time.</p>
            <p>I coded the entire thing from scratch in C++.</p>
            <p>This proved to be a partial success and a partial failure. It was a success in that the bot did get better at killing pigs. It was also a success in that I had a lot of fun and learned a lot. But at the same time it was a failure because:</p>
            <ul>
                <li>The bot never really "mastered" the task.</li>
                <li>The randomisation algorithm I went with didn't really produce good results, despite my best efforts to fine-tune it. Randomisation is just a bad way to train a complex neural network. It would have been better if I had used actual training data like a video.</li>
                <li>The training times were long (1 day of training for not-that-impressive results). Since it was a game and I had only one computer, only one simulation could run at once. Ideally you want to be running hundreds or thousands of simulations at once. Each simulation took around 30 seconds, so the training was inevitably slow.</li>
                <li>The mathematical calculations were done on the CPU, not the GPU, which limited its performance (in my defence this was before libraries like PyTorch became really mainstream).</li>
            </ul>
            <p>This is what the training looked like. As you can see I made a windows API UI to go with it, which helped me debug what was going on. The coloured squares show how the bot perceives the three different primary colours (this is ultra cool because you can literally see it learning to recognise corners and lines). The bigger boxes show how the bot sees the world (Apparently, it's quite dark!). My theory is that the three red dots on the rightmost image are actually the bot recognising the eyes of the pig in the top-right.</p>
            <img src="images/minecraft_bot_1.png"></img>
            <p>Here's a video of the bot in action. As you can see, it does kill pigs. It also exhibits some interesting adaptations. For example, it has a propensity for looking at the floor, which must be so that it can keep an eye on the pigs. It also jumps when it sees a pig. This must be because jumping increases your damage in Minecraft, letting it kill more pigs. Lastly, when there are no pigs on the screen, the bot walks around the room, trying to find some.</p>
            <iframe  src="https://www.youtube.com/embed/xxssD8-hQU8?si=6XMu4QE0J0RH9rz_" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            <h2>Talisman Online bot</h2>
            <p>Another project I worked on in C++ was creating a bot for the game Talisman Online (this was just for fun, I didn't release it or anything).</p>
            <p>Using Cheat Engine, I identified memory locations where important data was stored, such as the player's inventory, health, cursor status, etc. Interestingly, the game used an obfuscation technique where every new version of the game would scramble the pointer offsets of the data (this wasn't due to the actual game code having changed, since no new features nor bug fixes had been added to the game for a very long time). To make sure the bot worked with each new version I had to implement some memory scanning procedures in C++ that would look for a pattern of memory, and from there, extract the values that I wanted.</p>
            <p>Once I could read (and sometimes write) the program's memory I was able to use the Windows API to create routines that would perform keypresses. I also made a rudimentary UI for the bot using the Windows API.</p>
            <p>The bot was really cool, and it was awesome being able to explore things and places I'd never seen in a game I started playing when I was just a kid! The reason I'm a fairy is because... well... they are the best solo class... duh...!</p>
            <img src="images/talisman_online_bot_1.png"></img>
            <h2>Zeppelin Hero</h2>
            <p>This is a completely unfinished "game" prototype I made using C++ and OpenGL. Basically, it's supposed to be a Guitar Hero clone based on the band Led Zeppelin.</p>
            <p>It's sort of really bad, but considering I had only just turned 14 at the time, it's actually pretty cool for something that was probably less than 70 hours' work.</p>
            <iframe src="https://www.youtube.com/embed/iOPM6iVtbMs?si=l4amsBhIFny1bN3Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </>
    )
}