import { useContext } from "react";
import { SiteContext } from "../globalcontext";

export function ReactPage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }}>
                <p>This website is built in React, <a href="https://github.com/anthonysharpy/portfolio" rel="noreferrer" target="_blank">here's the source code for it</a> 😁</p>
                <p>I actually have more experience using Angular, but since React is a lot more common, React it was! However, I worked for a year with Angular (version 7 I think it was). Here are some examples of the sorts of things I worked on:</p>
                <ul>
                    <li><a href="https://quotes.insuremystuff4less.com/static/caravan" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/static/caravan</a></li>
                    <li><a href="https://quotes.insuremystuff4less.com/taxi/vehicle" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/taxi/vehicle</a></li>
                </ul>
                <p>Obviously not all of that was made by me, and it's changed slightly since I worked there, but not much.</p>
                <p>I also used Vue.js/Laravel in a commercial setting for one and a half years, working on an internal corporate system at my last job. At my current job we utilise JavaScript, Vue and CakePHP on the frontend.</p>
                <h2>This site's layout</h2>
                <p>I opted for a single-page website since not only is this much simpler, but it also makes the site feel more responsive (And unique!). I wanted a simple and modern layout that was easy to navigate and that conveyed an upbeat and positive message, whilst also being unique. The site is optimised for desktop but has also been designed to display correctly on mobile and tablet. I chose not to minify the CSS etc since I want people to be able to see the good (and bad) design decisions I have made.</p>
                <h2>Tech decisions</h2>
                <p>The background animations are created from scratch using React Three Fiber, which is a React wrapper around the three.js graphics library. In hindsight it would have been better just to use three.js natively; Fiber adds some overhead in that it requires that the scene is re-generated every time you add or remove an object. There are probably ways around this, but this is not really something I felt like it was worth spending days and days on.</p>
                <p>I wrote the site using TypeScript instead of plain JavaScript. The downside of TypeScript is that it's much more verbose, which can slow you down a little bit (especially when dealing with something like a graphics library). That being said, the rigidity that TypeScript provides is great for large or complex projects, and personally I thought that the clarity the types provided was helpful when I was working on the physics logic (see below).</p>
                <p></p>
                <h2>The background</h2>
                <p>The scene in the background is dynamically generated and rendered. The scene is essentially a number of cubes spawning randomly (I like to pretend they're meteors) that explode into pieces when collided with.</p>
                <p>The scene relies on a rudimentary gameplay loop that processes physics and object-specific logic. Scene state is stored in the <code>SceneState</code> class. All scene objects derive from a <code>SceneObject</code> base class in order to keep things uniform. For example, each object has a <code>mesh</code>, <code>velocity</code>, <code>angularVelocity</code>, <code>rotation</code> and <code>position</code>, among other characteristics. Physics behaviour is abstracted into its own <code>CollisionHandler</code> base class which is further extended for each shape type.</p>
                <p>I created the collision logic myself. It's nothing too fancy - just a bunch of spheres and a floor. But it is kinda cool in that we get to simulate things like gravity and drag. I would have made the scene more intense, but in the end no amount of optimisation could fix the slow, interpreted, single-core disappointment that is JavaScript within any sane timeframe.</p>
            </div>

            <div style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }}>
                <p>このウェブサイトはReactで構築されています。<a href="https://github.com/anthonysharpy/portfolio" rel="noreferrer" target="_blank">こちらがそのソースコードです</a> 😁</p>
                <p>実際、私はAngularの方が経験がありますが、Reactの方が一般的なのでReactを使用しました。ただし、Angular（バージョン7だったと思います）では1年間働きました。以下は、私が取り組んだ作業の一部の例です：</p>
                <ul>
                    <li><a href="https://quotes.insuremystuff4less.com/static/caravan" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/static/caravan</a></li>
                    <li><a href="https://quotes.insuremystuff4less.com/taxi/vehicle" rel="noreferrer" target="_blank">https://quotes.insuremystuff4less.com/taxi/vehicle</a></li>
                </ul>
                <p>もちろん、これらのすべてを私が作成したわけではなく、私が働いていた時から少し変わっていますが、大きな変更はありません。</p>
                <p>また、前職では商業環境で1年半にわたりVue.js/Laravelを使用し、内部企業システムに取り組みました。現在の職場では、フロントエンドでJavaScript、Vue、CakePHPを使用しています。</p>

                <h2>このサイトのレイアウト</h2>
                <p>シングルページのウェブサイトを選択しました。これはシンプルで、サイトがより応答性が高く感じられるからです（そしてユニークです！）。シンプルでモダンなレイアウトにして、ナビゲートしやすく、明るく前向きなメッセージを伝えたいと考えました。また、デスクトップ向けに最適化されており、モバイルやタブレットでも正しく表示されるように設計されています。CSSなどを圧縮しなかったのは、私のデザイン上の良い点と悪い点の両方を見てもらいたかったからです。</p>

                <h2>技術的な選択</h2>
                <p>背景アニメーションはthree.jsグラフィックスライブラリのReactラッパーであるReact Three Fiberを使用してゼロから作成しました。振り返ってみると、ネイティブにthree.jsを使用する方が良かったかもしれません。Fiberはオブジェクトを追加または削除するたびにシーンを再生成する必要があるため、オーバーヘッドが発生します。これを回避する方法はあるかもしれませんが、そこに何日も費やす価値があるとは思いませんでした。</p>
                <p>このサイトはプレーンなJavaScriptではなくTypeScriptで書きました。TypeScriptの欠点は、記述が非常に冗長であり、特にグラフィックスライブラリを扱うときに少し速度が遅くなることです。しかし、TypeScriptが提供する厳格さは、大規模または複雑なプロジェクトには非常に良いですし、個人的には、物理ロジックに取り組む際に型が提供する明確さが役立ちました（以下を参照）。</p>

                <h2>背景</h2>
                <p>背景のシーンは動的に生成され、レンダリングされます。このシーンは基本的にランダムにスポーンするキューブの集合で、衝突すると破片になります。</p>
                <p>シーンは物理とオブジェクト固有のロジックを処理する基本的なゲームループに依存しています。シーンの状態は<code>SceneState</code>クラスに保存されます。すべてのシーンオブジェクトは<code>SceneObject</code>基底クラスから派生し、統一性を保つようにしています。例えば、各オブジェクトには<code>mesh</code>、<code>velocity</code>、<code>angularVelocity</code>、<code>rotation</code>、<code>position</code>などの特性があります。物理挙動は<code>CollisionHandler</code>基底クラスに抽象化され、各形状タイプごとに拡張されます。</p>
                <p>衝突ロジックは自分で作成しました。特に凝ったものではなく、単にいくつかの球と床です。しかし、重力や抵抗などをシミュレートできる点は少しクールです。シーンをもっと激しくしたかったのですが、どんなに最適化しても、JavaScriptの遅いインタプリタとシングルコアの性能の限界を修正することはできませんでした。</p>
            </div>
        </>
    )
}