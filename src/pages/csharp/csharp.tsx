import { useContext } from "react";
import { SiteContext } from "../globalcontext";

export function CSharpPage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }}>
                <p>I started using C# back in 2014. Making games in Unity is what got me into it originally, and actually a lot of my C# experience is games-related.</p>            
                
                <h2>Loan API</h2>
                <p>I designed the C# API for our loan application service at my current job. Simply put, the API is designed to allow you to create and progress an application for a loan to completion. You can find the source code <a href="https://github.com/paymentassist/paymentassist-csharp" rel="noreferrer" target="_blank">here</a>.</p>

                <h2>Backend insurance integrations</h2>
                <p>At my first job I spent most of my time writing integrations for insurance companies on our C# backend. The purpose of these integrations was to take the data collected by us on our website about the customer, forward it onto the insurer in order to receive a quote, and then process the response back into a format that our system understood. I quite enjoyed this as it involved a lot of liasing with clients in order to ascertain their requirements. By the time I left I was responsible for more ongoing integrations than anyone else. I was even given extra work as some of the other developers were struggling with their workload.</p>

                <h2>Sandbank</h2>
                <p>Sandbank is a MongoDB-like database I created for the game engine s&box. s&box doesn't support any databases out-of-the-box, so your only option is to manually write files to disk, or to host your own API that can communicate with a database for you. Both of those are obviously not great solutions, especially for new developers, so I created this project to help make everyone's lives easier. Some features at a glance:</p>
                <ul>
                    <li><b>Thread-safe</b>: you can have as many threads as you want writing to or reading from the database at the same time, especially if you're looking for a performance boost.</li>
                    <li><b>Fast</b>: you can insert up to 560,000 documents per second and search up to ~40 million documents per second, using predicates.</li>
                    <li><b>Easy to install</b>: just copy and paste the code folder into your project and you're done.</li>
                    <li><b>Easy to use</b>: the entire front-facing API is documented thoroughly and the pros and cons of changing any of the configuration options are clearly explained to the user in plain English.</li>
                    <li><b>Lightweight</b>: store thousands of documents in just a couple of megabytes.</li>
                </ul>
                <p>You can find the code for it <a href="https://github.com/anthonysharpy/sandbank" rel="noreferrer" target="_blank">here</a>.</p>

                <h2>Blazor Server dashboard site</h2>
                <p>Below you can see a demonstration of a Blazor Server dashboard website I put together in a weekend. It's designed to be a hypothetical example of how you could use Blazor Server to create an internal dashboard for a company. You can find the code for it <a href="https://github.com/anthonysharpy/blazor-dashboard" rel="noreferrer" target="_blank">here</a>. It's not meant to be perfect and was just done for a bit of practice.</p>
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
                <p>Something I made back in 2017 was this graphical programming system for a game I was working on. Yes, I know 2017 was a really long time ago (Brexit hadn't even happened yet!), but I just think it's really cool!</p>
                <p>Basically you would add functions to the flying droid (let's call these functions "nodes"). Some of these nodes were logical primitives like "and", "or", "not", etcetera. Others would allow the droid to interact with the world - for example, there's one called GetClosestEnemy. Once you programmed the droid by joining all the nodes together, it performed the actions as instructed. For this I had to make a routine that would parse the graph and perform all the logic on it, which was actually quite fun.</p>
                <img alt="A graphical programming system." className="styled-image" src="images/graphical_programming_2.png"></img>
                <img alt="A graphical programming system." className="styled-image" src="images/graphical_programming_1.jpg"></img>
                <p>Another cool thing I did for that game was write some code that would chop meshes in half along a plane:</p>
                <img alt="A tree cut in half." className="styled-image" src="images/mesh_cut_in_half.png"></img>
            </div>

            <div style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }}>
                <p>2014年にC#を使い始めました。もともとはUnityでゲームを作ることから始まり、実際、私のC#経験の多くはゲーム関連です。</p>

                <h2>ローンAPI</h2>
                <p>現在の仕事では、ローン申請サービスのC# APIを設計しました。簡単に言えば、このAPIはローン申請を作成し、完了まで進めるために設計されています。ソースコードは<a href="https://github.com/paymentassist/paymentassist-csharp" rel="noreferrer" target="_blank">こちら</a>にあります。</p>

                <h2>バックエンド保険統合</h2>
                <p>最初の仕事では、主にC#バックエンドで保険会社向けの統合を行っていました。これらの統合の目的は、ウェブサイトで収集した顧客データを保険会社に送信し、見積もりを受け取り、その応答をシステムが理解できる形式に変換することでした。これには多くのクライアントとの調整が必要だったため、かなり楽しんでいました。退職するまでに、私は他の誰よりも多くの継続的な統合を担当していました。他の開発者が作業負荷に苦しんでいたため、追加の作業も任されていました。</p>

                <h2>Sandbank</h2>
                <p>Sandbankは、s&boxゲームエンジン用に作成したMongoDBのようなデータベースです。s&boxはデータベースをサポートしていないため、手動でファイルをディスクに書き込むか、自分でAPIをホストしてデータベースと通信する必要があります。これらはどちらもあまり良い解決策ではないため、このプロジェクトを作成して皆の生活を楽にしました。以下はその特徴です：</p>
                <ul>
                    <li><b>スレッドセーフ</b>: パフォーマンス向上を目指して、同時にデータベースに読み書きするスレッドをいくらでも持つことができます。</li>
                    <li><b>高速</b>: 1秒あたり最大560,000ドキュメントを挿入し、述語を使用して1秒あたり最大約4,000万ドキュメントを検索できます。</li>
                    <li><b>インストールが簡単</b>: コードフォルダをプロジェクトにコピー＆ペーストするだけで完了です。</li>
                    <li><b>使いやすい</b>: 全体のAPIが詳細に文書化されており、設定オプションを変更する利点と欠点がユーザーにわかりやすく説明されています。</li>
                    <li><b>軽量</b>: 数千のドキュメントをわずか数メガバイトに保存できます。</li>
                </ul>
                <p>コードは<a href="https://github.com/anthonysharpy/sandbank" rel="noreferrer" target="_blank">こちら</a>にあります。</p>

                <h2>Blazor Serverダッシュボードサイト</h2>
                <p>以下は、週末に作成したBlazor Serverダッシュボードサイトのデモンストレーションです。これは、会社の内部ダッシュボードを作成するためにBlazor Serverを使用する方法の仮説的な例として設計されています。コードは<a href="https://github.com/anthonysharpy/blazor-dashboard" rel="noreferrer" target="_blank">こちら</a>にあります。完璧ではなく、ちょっとした練習のために行っただけです。</p>
                <video controls><source src="videos/blazor_site_1.mp4"/></video>

                <h2>S&box City</h2>
                <p>S&box Cityは、s&boxゲームエンジンで開発しているゲームモードで、1年以上にわたって取り組んでいます。プレイヤー、車両、NPC、武器、エンティティ、永続性など、すべてがほぼゼロからコーディングされていますが、エンジンの作成者から少しだけコードを借りています。</p>
                <p><i>「これは本当にあなたのC#スキルを示すものですか？」</i> つまり、もちろんです。それは<i>「これは私がインターネット上のチュートリアルを使用してC#でコーディングした基本的なREST APIの例です」</i>ではありません。しかし、答えは間違いなくイエスです！その理由は次のとおりです：</p>
                <ul>
                    <li>1年以上取り組んできたことは、非常に優れた労働倫理を示しています！</li>
                    <li>コードベースは数万行に成長し、200以上のコードファイルがあります。これは良いプロジェクト管理スキルを必要とします。</li>
                    <li>ゲームには多くの複雑で相互依存する部分があり、ネットワーク呼び出し、動的にロードおよびアンロードされるエンティティ、データストレージなどがあります。何かが壊れると、全体の体験が台無しになります。これは品質管理の優れた目を必要とします。</li>
                    <li>ゲームエンジン（s&box）はまだ開発初期段階にあるため、多くの場合、巧妙な回避策を見つける必要がありました（実際の世界と同じように！）。</li>
                    <li>ゲームモードのリリースサイクルを一定に保つようにしています（実際のコードと同じように！）。</li>
                </ul>
                <p>話すよりも見せたほうがいいですね…これらは実際の機能の約10％に過ぎません。唯一の概要ビデオには不適切な言葉が多すぎるのでごめんなさい！</p>
                <p className="caption">自動運転車（心配しないでください、意図的に間抜けです）</p>
                <video controls><source src="videos/lamerp6.mp4"/></video>
                <p className="caption">実績</p>
                <video controls><source src="videos/lamerp5.mp4"/></video>
                <p className="caption">テーザー武器</p>
                <video controls><source src="videos/lamerp2.mp4"/></video>
                <p className="caption">保存されたプレイヤーデータ - 例えば銀行残高</p>
                <video controls><source src="videos/lamerp4.mp4"/></video>
                <p className="caption">手錠</p>
                <video controls><source src="videos/lamerp3.mp4"/></video>
                <p className="caption">破壊可能なドア</p>
                <video controls><source src="videos/lamerp1.mp4"/></video>

                <h2>グラフィカルコーディングシステム</h2>
                <p>2017年に作成したものの1つは、このグラフィカルプログラミングシステムです。2017年は本当に長い昔のことですが（ブレグジットさえまだ起きていませんでした！）、ただ本当にクールだと思います。</p>
                <p>基本的には、飛行ドロイドに関数（「ノード」と呼びましょう）を追加します。これらのノードのいくつかは「and」、「or」、「not」などの論理的なプリミティブでした。他のものはドロイドが世界と相互作用することを可能にします。例えば、「GetClosestEnemy」というものがあります。すべてのノードを結合してドロイドをプログラムすると、指示通りにアクションを実行しました。これにはグラフを解析してすべてのロジックを実行するルーチンを作成する必要がありましたが、実際には非常に楽しかったです。</p>
                <img alt="A graphical programming system." className="styled-image" src="images/graphical_programming_2.png"></img>
                <img alt="A graphical programming system." className="styled-image" src="images/graphical_programming_1.jpg"></img>
                <p>そのゲームのために作成したもう1つのクールなものは、平面に沿ってメッシュを半分に切断するコードでした：</p>
                <img alt="A tree cut in half." className="styled-image" src="images/mesh_cut_in_half.png"></img>
            </div>
        </>
    )
}