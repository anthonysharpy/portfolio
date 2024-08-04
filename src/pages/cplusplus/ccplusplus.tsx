import { useContext } from "react";
import { SiteContext } from "../globalcontext";

export function CCPlusPlusPage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }}>
                <p>C++ was probably the first language I got into properly, although admittedly it's not something I have used commercially. But I am familiar with it and I know that some companies do use it as part of their tech stack, which is why I thought to mention it. Plus, I have done some cool things with it.</p>
                <h2>GNU Compiler Collection contributions</h2>
                <p>A few years ago I contributed some bug-fixes to the GNU C++ compiler. I often say that it is the hardest thing I've ever done...</p>
                <p>Firstly, I decided to pick bugs that were ~10 years old (I think I wanted a challenge or something...). As the compiler is about 15 million lines of code long, next I had to figure out exactly where the fix needed to be done. After that, I had to understand the relevant sections of the published C++ standard, and format my patch following the strict styling rules enforced by GNU (for example, did you know that every comment has to be followed by two spaces?). My code was then scrutinised by people who are quite literally world-leading experts in compilers and C++. It was very, very, very difficult, but I did it! And I would have contributed more, but I quickly came to the realisation that the kinds of people who contribute to this are the kinds of people who dedicate decades of their life to it, because it requires a <em>lot</em> of specialised knowledge. In other words, a good full-time job, but not a great hobby!</p>
                <p>Feel free to see below for yourself some of the things I contributed.</p>
                <ul>
                    <li><p><a href="https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93" rel="noreferrer" target="_blank">https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93</a></p></li>
                    <li><p><a href="https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f" rel="noreferrer" target="_blank">https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f</a></p></li>
                </ul>
                <p>There was also another bug-fix which I co-authored with Jason Merrill, but I can't seem to find the commit for it (perhaps they haven't merged it in yet). But the change log entry is <a href="https://github.com/gcc-mirror/gcc/blob/36eec7995b4d53083c3ee7824bd765b5eba8b1a1/gcc/cp/ChangeLog-2021" rel="noreferrer" target="_blank">here</a> if you search for my name.</p>
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
                <img alt="My Minecraft bot GUI." src="images/minecraft_bot_1.png"></img>
                <p>Here's a video of the bot in action. As you can see, it does kill pigs. It also exhibits some interesting adaptations. For example, it has a propensity for looking at the floor, which must be so that it can keep an eye on the pigs. It also jumps when it sees a pig. This must be because jumping increases your damage in Minecraft, letting it kill more pigs. Lastly, when there are no pigs on the screen, the bot walks around the room, trying to find some.</p>
                <iframe  src="https://www.youtube.com/embed/xxssD8-hQU8?si=6XMu4QE0J0RH9rz_" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                <h2>Talisman Online bot</h2>
                <p>Another project I worked on in C++ was creating a bot for the game Talisman Online (this was just for fun, I didn't release it or anything).</p>
                <p>Using Cheat Engine, I identified memory locations where important data was stored, such as the player's inventory, health, cursor status, etc. Interestingly, the game used an obfuscation technique where every new version of the game would scramble the pointer offsets of the data (this wasn't due to the actual game code having changed, since no new features nor bug-fixes had been added to the game for a very long time). To make sure the bot worked with each new version I had to implement some memory scanning procedures in C++ that would look for a pattern of memory, and from there, extract the values that I wanted.</p>
                <p>Once I could read (and sometimes write) the program's memory I was able to use the Windows API to create routines that would perform keypresses. I also made a rudimentary UI for the bot using the Windows API.</p>
                <p>The bot was really cool, and it was awesome being able to explore things and places I'd never seen in a game I started playing when I was just a kid! The reason I'm a fairy is because... well... they are the best solo class... duh...!</p>
                <img alt="My Talisman Online bot." src="images/talisman_online_bot_1.png"></img>
                <h2>Zeppelin Hero</h2>
                <p>This is a completely unfinished "game" prototype I made 12 years ago using C++ and OpenGL. Basically, it's supposed to be a Guitar Hero clone based on the band Led Zeppelin.</p>
                <p>It's sort of really bad, but considering I had only just turned 14 at the time, it's actually pretty cool for something that was probably less than 70 hours' work.</p>
                <iframe src="https://www.youtube.com/embed/iOPM6iVtbMs?si=l4amsBhIFny1bN3Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>

            <div style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }}>
                <p>C++はおそらく私が最初に本格的に取り組んだ言語ですが、商業的に使用したことはありません。ただし、C++に精通しており、一部の企業が技術スタックの一部として使用していることを知っているため、ここで言及する価値があると思いました。さらに、C++でいくつかのクールなことをやりました。</p>

                <h2>GNUコンパイラコレクションへの貢献</h2>
                <p>数年前、GNU C++コンパイラにバグ修正をいくつか提供しました。これは私が今までにやった中で最も難しいことだとよく言います...</p>
                <p>まず、約10年前のバグを選ぶことにしました（挑戦したかったのだと思います）。コンパイラが約1500万行のコードからなるため、次に修正が必要な場所を正確に特定しなければなりませんでした。その後、公開されているC++標準の関連部分を理解し、GNUが課す厳格なスタイルルール（例えば、すべてのコメントは2つのスペースで終わらなければならないことを知っていましたか？）に従ってパッチをフォーマットする必要がありました。私のコードは、文字通り世界的に著名なコンパイラとC++の専門家によって精査されました。それは非常に、非常に、非常に難しかったですが、やり遂げました！もっと貢献したかったのですが、すぐに気づいたのは、これに貢献する人々は、非常に専門的な知識を必要とするため、何十年もこれに捧げている人々だということです。つまり、良いフルタイムの仕事ですが、素晴らしい趣味ではありません！</p>
                <p>以下に私が貢献したもののいくつかを示します。</p>
                <ul>
                    <li><p><a href="https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93" rel="noreferrer" target="_blank">https://github.com/gcc-mirror/gcc/commit/7e0f147a29f42d6149585573650bd4827f3b2b93</a></p></li>
                    <li><p><a href="https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f" rel="noreferrer" target="_blank">https://github.com/gcc-mirror/gcc/commit/be246ac2d26e1cb072f205bf97d5eac150220f3f</a></p></li>
                </ul>
                <p>ジェイソン・メリルと共同で執筆した別のバグ修正もありましたが、そのコミットを見つけることができません（おそらくまだマージされていないのでしょう）。ただし、変更ログエントリは<a href="https://github.com/gcc-mirror/gcc/blob/36eec7995b4d53083c3ee7824bd765b5eba8b1a1/gcc/cp/ChangeLog-2021" rel="noreferrer" target="_blank">こちら</a>で私の名前を検索すると見つかります。</p>

                <h2>Minecraft畳み込みニューラルネットワークボット</h2>
                <p>COVIDの間に行った非常に楽しいプロジェクトの1つは、Minecraftをプレイするための畳み込みフィードフォワードニューラルネットワークを使用したボットの作成でした… ある程度は。ボットに一定時間内にできるだけ多くの豚を殺すことを学習させました。ボットはランダムな進化アルゴリズムを使用して学習しました。シミュレーションの開始時に、いくつかのニューロンがランダム化されました。ボットがうまく機能した場合、その変更は維持されました。うまくいかなかった場合、変更は元に戻されました。ボットが進行するにつれて、ランダム化の規模が減少し、最終的にはネットワークを完全にスクランブルするのではなく、小さな調整だけを行うことを目指しました。</p>
                <p>私はこれをC++でゼロからコーディングしました。</p>
                <p>これは部分的に成功し、部分的に失敗しました。豚を殺すのが上手くなったという点で成功でした。また、多くの楽しみと学びがありました。しかし同時に、次の理由で失敗しました：</p>
                <ul>
                    <li>ボットはタスクを「習得」することはありませんでした。</li>
                    <li>ランダム化アルゴリズムは、私の最善の努力にもかかわらず、良い結果を生み出しませんでした。ランダム化は複雑なニューラルネットワークを訓練するのに悪い方法です。実際のトレーニングデータ（ビデオなど）を使用した方が良かったでしょう。</li>
                    <li>トレーニング時間が長かった（印象的でない結果のために1日かかりました）。これはゲームであり、1台のコンピュータしか持っていなかったため、1回のシミュレーションしか実行できませんでした。理想的には、数百または数千のシミュレーションを同時に実行したいところです。各シミュレーションは約30秒かかり、トレーニングは避けられないほど遅くなりました。</li>
                    <li>数学的計算はCPUで行われ、GPUでは行われなかったため、パフォーマンスが制限されました（私を弁護するために言うと、これはPyTorchのようなライブラリが主流になる前のことです）。</li>
                </ul>
                <p>これはトレーニングの様子です。見ての通り、Windows APIのUIを作成してデバッグに役立てました。色付きの四角形は、ボットが3つの異なる基本色をどのように認識するかを示しています（コーナーやラインを認識する様子が見られるので、これは非常にクールです）。大きなボックスは、ボットが世界をどのように見ているかを示しています（どうやらかなり暗いようです）。私の理論では、右端の画像の3つの赤い点は、右上の豚の目を認識しているのだと思います。</p>
                <img alt="My Minecraft bot GUI." src="images/minecraft_bot_1.png"></img>
                <p>ここにボットの実行中のビデオがあります。見ての通り、豚を殺しています。いくつかの興味深い適応も見られます。例えば、豚を見つけるために床を見る傾向があります。また、豚を見たときにジャンプします。これはMinecraftでジャンプするとダメージが増えるため、豚をより多く殺すことができるからです。最後に、画面に豚がいない場合、ボットは部屋を歩き回り、豚を探しています。</p>
                <iframe src="https://www.youtube.com/embed/xxssD8-hQU8?si=6XMu4QE0J0RH9rz_" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>

                <h2>タリスマンオンラインボット</h2>
                <p>C++で取り組んだもう1つのプロジェクトは、タリスマンオンラインのボットの作成でした（これは単に楽しみのためで、公開したりはしていません）。</p>
                <p>Cheat Engineを使用して、プレイヤーのインベントリ、健康状態、カーソルの状態など、重要なデータが保存されているメモリ位置を特定しました。興味深いことに、ゲームはデータのポインタオフセットをシャッフルする難読化技術を使用していました（新機能やバグ修正が追加されていないため、実際のゲームコードが変更されたわけではありません）。各新バージョンにボットが対応するように、メモリスキャン手続きをC++で実装し、パターンを検索して必要な値を抽出しました。</p>
                <p>プログラムのメモリを読み書きできるようになると、Windows APIを使用してキープレスを実行するルーチンを作成しました。また、Windows APIを使用してボットの基本的なUIも作成しました。</p>
                <p>ボットは本当にクールで、子供の頃に始めたゲームで見たことのない場所やものを探索できるのは素晴らしかったです！私が妖精なのは... まあ... それが最高のソロクラスだからです... duh...！</p>
                <img alt="My Talisman Online bot." src="images/talisman_online_bot_1.png"></img>

                <h2>Zeppelin Hero</h2>
                <p>これは12年前にC++とOpenGLを使用して作成した完全に未完成の「ゲーム」プロトタイプです。基本的には、Led Zeppelinに基づいたGuitar Heroのクローンです。</p>
                <p>非常に悪いものでしたが、当時14歳になったばかりだったことを考えると、実際には70時間未満の作業でかなりクールなものです。</p>
                <iframe src="https://www.youtube.com/embed/iOPM6iVtbMs?si=l4amsBhIFny1bN3Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
        </>
    )
}