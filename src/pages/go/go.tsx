import './go.css';
import { Reference } from "../../components/body/reference/reference";
import { useContext } from 'react';
import { SiteContext } from '../../pages/globalcontext';

export function GoPage() {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div style={{ display: siteContext?.currentLanguage === "EN" ? 'block' : 'none' }} className="go-page-content">
                <p>Go is one of my favourite programming languages. It's fast, relatively low-level, has great error handling, has an awesome standard library for modern development tasks like running servers and doesn't come with all the headache that languages like C++ do.</p>
                
                <h2>Loan API</h2>
                <p>I designed the Go API for our loan application service at my current job. Simply put, the API is designed to allow you to create and progress an application for a loan to completion. You can find the source code <a href="https://github.com/paymentassist/paymentassist-go" rel="noreferrer" target="_blank">here</a>.</p>

                <h2>Profits API</h2>
                <p>At my last job I designed a new Go API for our internal company dashboard. Around 70% of that development effort went towards developing systems for processing financial data; the API would consume bills, credits and rebates that were fed in from an external billing solution (InTime), convert them to GBP using the official monthly HMRC exchange rates, assign them to the correct consultant in accordance with the percentage split they were owed and produce a payout value that dictated the amount staff were paid in commission each month.

                It would also output this data in the form of graphs that could be queried over a given time frame. Some reports would utilise tens of thousands of data points, yet still loaded in seconds due to careful use of caching.
                
                The API was also responsible for other things such as sending out emails, managing account permissions and processing CSV uploads.</p>

                <h2>Dating app API</h2>
                <p>I wrote the API for a dating app I created with a friend. The app handled authentication, authorisation, sending emails, serving app data, and of course, applying the matching algorithm.</p>
                <iframe src="https://yayornay.se"></iframe>
                <p>I also set up all the testing and associated infrastructure. In particular we even had an integration tester as a separate Go program that spun up a test database (via Docker) and a copy of the API to perform all kinds of tests. I originally thought about making this integration tester in PowerShell, but since scripts are often both slow to run and develop, and since the same thing in Go was only a hundred lines of code or so, I decided against it.</p>
                <p>The API itself was pretty powerful too. We had a 2-core server hosted on DigitalOcean. In one of our tests we managed to spin up 5,000 concurrent WebSocket connections to the test API. Once we had done that, we sent out one message per WebSocket connection (each of which also involved multiple database calls). Our goal: to send and then receive a response for these 5,000 messages in under 10 seconds. The verdict? It completed in 2.5 seconds. From this single test, it seemed that the server could handle roughly 2,000 WebSocket requests per second in ideal conditions.</p>
                <p>This is not necessarily to do with Go but it was also great working with MongoDB on this project. Go's tags feature lets you easily map your structs to your documents. After that, you just insert the data and it appears in the database like magic.</p>

                <h2>Other uses</h2>
                <p>Some other things I have used Go for include:</p>
                <ul>
                    <li>I first started using Go back in 2017 in order to replace the PHP server I made for my law app.</li>
                    <li>Made a bot for a game along with its own graphical interface (for my amusement only).</li>
                </ul>

                <br/>
                <hr></hr>
                <h2>Go tips and tricks</h2>
                <p>Given that I have more experience with Go now, I was going to delete this part. But I spent so much time on it that I thought it can't hurt to leave it in for a little while longer. </p>

                <h2>Safe(r) concurrent access with getters and setters</h2>
                <p>I had an interview years ago for a Go job. I think the interviewers were a little bit sceptical of me, as I had no commercial experience of Go at the time. I'm grateful they did, but to be honest, I'm not really sure why they offered to interview me, since I don't think they really had any intention of giving me the job.</p>
                <p>With one eyebrow raised, I remember one of the things they said was <i>"So, well, have you for example used things like concurrency in Go?"</i>. I said that I hadn't, but that I had done it in other languages, and said I didn't imagine it would be too hard. They laughed and said <i>"Yeah, right"</i>.</p>
                <p>So, were they right about concurrency being hard? Well, no, they were just jerks. But they were right insofar as to say that concurrency is not always <em>easy</em>. If you don't respect it, it <em>will</em> come back and bite you. Like an American Bully XL. The same is true for probably any programming language.</p>
                <p>So how <em>do</em> you deal with concurrency - specifically, concurrent access? Well, one cool way of guarding concurrent access is to encapsulate it behind getters and setters. For example:</p>
                <pre>
                    <code>{`type SomeState struct {
        exampleMap map[string]struct{}
        mapLock    sync.Mutex
    }

    func (someState *SomeState) Initialise() {
        someState.exampleMap = make(map[string]struct{})
    }

    func (someState *SomeState) AddEntry(entry string) {
        someState.mapLock.Lock()
        defer someState.mapLock.Unlock()

        someState.exampleMap[entry] = struct{}{}
    }

    func (someState *SomeState) EntryExists(entry string) bool {
        someState.mapLock.Lock()
        defer someState.mapLock.Unlock()

        _, exists := someState.exampleMap[entry]

        return exists
    }

    func main() {
        state := SomeState{}
        state.Initialise()

        for i := 0; i < 100; i++ {
            print(i, "\\n")

            entryName := "entry" + strconv.Itoa(i)

            go state.AddEntry(entryName)

            go func(entryName string) {
                // Sometimes false, sometimes true.. but no crashes!
                print(state.EntryExists(entryName), "\\n")
            }(entryName)
        }
    }`}
                    </code>
                </pre>
                <p>By using getters and setters we can completely forget about having to lock and unlock the resource. It's all done for us. This results in fewer mistakes and fewer bugs! Not only that, but we didn't have to pollute our code with <code>.Lock()</code> and <code>.Unlock()</code> everywhere. Notice also how both the lock and the protected value exist as unexported fields in a struct. If communicating across packages, this can add an extra layer of security as you can't modify the value directly even if you want to!</p>
                <h2>Functional programming patterns</h2>
                <p>When I moved from C# to Go, one of the things I really missed was LINQ's ability to perform operations on collections of objects - things like <code>.Where()</code>, <code>.Any()</code>, <code>.Select()</code>, etcetera. These kinds of patterns are the bread-and-butter of functional programming languages like Elixir, but for some reason they have become more and more common in procedural and object-oriented programming languages too. Probably because they are great.</p>
                <p>Unfortunately, Go does not currently allow the "=&gt;" syntax for anonymous functions (although there is community support for it<Reference number={1}/>). However, you can still more or less achieve the same behaviour as C#.</p>
                <p>Let's say we have a slice of type <code>FoodOrder</code>. Each <code>FoodOrder</code> describes something that's been ordered at a restaurant. Let's also define a type <code>Food</code>, which describes the (tasty) outcome of a <code>FoodOrder</code>.</p>
                <pre>
                    <code>{`type FoodOrder struct {
        PricePaid int // In pence.
        Name string
        OrderedAt time.Time
    }

    type Food struct {
        Name string
        MadeAt time.Time
    }

    func main() {
        orders := []FoodOrder {
            {
                Name: "Pizza",
                OrderedAt: time.Now().Add(time.Minute * -5),
                PricePaid: 1000
            },
            {
                Name: "Chips",
                OrderedAt: time.Now().Add(time.Minute * -6),
                PricePaid: 300
            },
            {
                Name: "Milkshake",
                OrderedAt: time.Now().Add(time.Minute * -4),
                PricePaid: 600
            },
        }
    }`}
                    </code>
                </pre>
                <p>Let's say all of our orders were just fulfilled. We need to mutate each <code>FoodOrder</code> into a <code>Food</code>. We could do this with a range loop, but it's necessarily boilerplatey:</p>
                <pre><code>{`func fulfillOrders(orders []FoodOrder) []Food {
        food := make([]Food, len(orders))

        for i, order := range orders {
            food[i] = Food {
                Name: order.Name,
                MadeAt: time.Now()
            }
        }

        return food
    }`}</code></pre>
                <p>My preferred approach is to implement a generic function that does all the heavy lifting for you:</p>
                <pre><code>{`func Transform[T interface{}, X interface{}](array []T, transform func(T) X) []X {
        result := make([]X, len(array))
        
        for i := range array {
            result[i] = transform(array[i])
        }
        
        return result
    }

    func fulfillOrders(orders []FoodOrder) []Food {
        return Transform(orders, func (order FoodOrder) Food {
            return Food {
                Name: order.Name,
                MadeAt: time.Now()
            }
        })
    }`}</code></pre>
                <p>This approach has multiple benefits. Firstly, this code is less error-prone, since you can't accidentally mess up indexing like you can with a for or range loop. Secondly, it is a little bit quicker to type. Thirdly, it is easier to read (albeit it might take a bit of getting used to if you've never coded this way before). When support for a short-hand anonymous function syntax does come out with Go, no doubt even more people will be doing it this way.</p>
                <p>Not convinced? Here's another example. Let's say we want to get the number of orders that were £3.00 or more.</p>
                <p>Traditional way:</p>
                <pre><code>{`// I don't know why anyone would ever write a function that does this but
    // let's just use it as an example.
    func getNumberOfExpensiveOrders(orders []FoodOrder) int {
        number := 0

        for _, order := range orders {
            if order.PricePaid >= 300 {
                number++
            }
        }

        return number
    }`}</code></pre>
                <p>Functional way:</p>
                <pre><code>{`func Count[T interface{}](array []T, include func(T) bool) int {
        result := 0
        
        for i := range array {
            if include(array[i]) {
                result++
            }
        }
        
        return result
    }

    // Wow!
    func getNumberOfExpensiveOrders(orders []FoodOrder) int {
        return Count(orders, func (order FoodOrder) bool { 
            return order.PricePaid > 300
        })
    }`}</code></pre>
                <h2>Breaking cyclical dependencies with nested packages</h2>
                <p>You may or may not know this (nobody seems to talk about it), but Go can actually have nested packages, which can be helpful for breaking-up cyclical dependencies whilst also keeping your project's folder structure squeaky-clean.</p>
                <p>Let me begin by explaining my approach to structuring a Go project. People don't like to admit it, but given that Go is such an opinionated language in just about every other regard, it's surprising how many ways you can structure a Go project. Like most people, I like to define packages so as to demarcate separations of responsibility. This is made useful by the fact that in Go, functions beginning with a lowercase letter are not visible outside of the package (unexported functions). This helps us interact with the outside world via our exported functions and types, whilst keeping all the implementation details hidden.</p>
                <p>Now let me follow that with a controversial opinion. I think most people would disagree with me, but the fact that Go doesn't allow cyclical dependencies is easily its worst feature. Of course, I understand the reasoning behind it - faster compile times (I'm not convinced by this, my complex C# game projects compile in ~5 seconds) and "better" code<Reference number={2}/>. It is often said that if you have cyclical dependencies, it's a symptom of you not having thought about your code structure properly. And while this is true in some cases, in others, I don't think this argument holds water.</p>
                <p>Let me describe a real-world example I had in the API for the dating app I worked on.</p>
                <p>Below we have a cyclical dependency. <code>users.BlockUser()</code> is calling <code>matches.UnmatchUsers()</code>, which is calling <code>conversations.LeaveAllConversationsWithUser()</code>, which is somewhere using the <code>users.User</code> type defined in the users package.</p>
                <img alt="A cyclical dependency." src="images/cyclic_dependency_1.svg"></img>
                <p>Here's my point: this cyclical dependency isn't the result of bad code. Clearly, the layout of the code <em>has</em> been thought-out, with clear separation of concerns.</p>
                <p>Now, you may be thinking to yourself things like <i>"Oh, well I wouldn't have structured it like that", or "Well, I think the issue is that [insert function here] actually belongs in [insert package name here]"</i>. But this is not my point. I'm not saying that there is no way to resolve this cyclical dependency, or that it couldn't have been done a <em>different</em> way. I'm merely saying that cyclical dependencies aren't necessarily the result of <em>bad</em> code. What I want to stress is the fact that - in this scenario I've just described - Go is disallowing <em>"good code"</em> with the justification that it somehow avoids <em>"bad code"</em>, which is ironic and, in my opinion, just a <em>bad feature</em>. (Also, I would point out that just about every other mainstream programming language allows cyclical dependencies in one form or another.)</p>
                <p>So we need a way to overcome this dependency problem. Unfortunately Go does not provide any convincing solutions.</p>
                <p>One solution is to create "interfacing packages" - new packages that facilitate communication between the cyclical packages in such as way as to break the cycle, often using interfaces<Reference number={3}/>. But this often involves polluting your project with a messy mixture of meaningless interfaces and redundant package definitions.</p>
                <p>Another solution is dependency injection<Reference number={4}/>. This makes a lot of sense for things like database and file handlers, since this allows easy mocking during tests (if you're into that). But in just about every other situation this is again a very messy solution, because it essentially involves reducing every package - or parts of packages - into an object. This a) makes the code much more complicated, b) introduces a messy assortment of program state since you have all these injected objects being passed around, and c) bastardises the core principles of Go; Go is not an object-oriented language, and should not be treated like one.</p>
                <p>Similar to the last approach, you can sometimes fix cyclical dependencies through what I'm going to call <em>"function injection"</em>, also known as pass-a-function-as-a-parameter (or via some package-level state). This is again another staple of functional programming. For example, if we have two packages that rely on eachother, and one of those dependencies is via a function call to the other package, instead of referencing the other package and invoking a function from it (causing a cycle), we can pass an anonymous function to the package via some other route that wraps the function we want to invoke. This gives us the same functionality without having to (directly) reference the package it comes from. However, while this pattern certainly has some great uses, for merely resolving cyclical dependencies, it's mostly a bandaid. Passing an anonymous function down what might be an already complex call stack can quickly get messy and unintuitive. And ideally we shouldn't be having to jump through hoops to fit the limitations of the language; the language should be empowering us to write code in the way that makes the most sense. Then again, this can be a quick and convenient fix in situations where other methods are not worth the effort.</p>
                <p>Another approach is to try combining multiple packages into one. This works, although it is probably more of a last-resort, since you'd be abandoning the separation of concerns between your packages (assuming your package structure was justified to begin with).</p>
                <p>The only worthwhile solution I've found (although I'm still not fond of it) is to break the offending code into a separate package. This is sort of similar to the first approach mentioned above, except we try not to rely on interfaces. But how do we do that without making our project structure messy? Let me show you!</p>
                <p>First we would do an analysis of the dependency cycle. We ask ourselves <i>"How do we break the cycle with the least amount of refactoring/effort?"</i> (of course, this isn't always the only factor to consider, but experience has taught me that it is the most important). In this case, let's say the answer is to break the conversations package's reliance on users by putting the types from users into a separate package. Given our initial structure:</p>
                <pre className="normal-pre">{`/users/users.go`}</pre>
                <p>We can refactor this into a nested package:</p>
                <pre className="normal-pre">{`/users/users.go\n/users/userstypes/userstypes.go`}</pre>
                <p><code>userstypes</code> becomes a new package. <code>conversations</code> can use it by importing <code>"myapp/m/v2/users/userstypes"</code>. And voilà! Not only do we keep a tidy project structure since we have not polluted our project root with unnecessary package folders, but we have broken the cyclical dependency.</p>
                <img alt="A resolved cyclical dependency." src="images/cyclic_dependency_2.svg"></img>
                <h2>References</h2>
                <ol>
                    <li id="#ref1"><a href="https://github.com/golang/go/issues/21498" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/21498</a></li>
                    <li id="#ref2"><a href="https://github.com/golang/go/issues/30247" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/30247</a></li>
                    <li id="#ref3"><a href="https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0" rel="noreferrer" target="_blank">https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0</a></li>
                    <li id="#ref4"><a href="https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef" rel="noreferrer" target="_blank">https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef</a></li>
                </ol>
            </div>

            <div style={{ display: siteContext?.currentLanguage === "JP" ? 'block' : 'none' }} className="go-page-content">
            <p>Goは私の好きなプログラミング言語の一つです。高速で、比較的低レベルで、優れたエラーハンドリングがあり、サーバーを動かすなどの現代的な開発タスクのための素晴らしい標準ライブラリを備えています。そして、C++のような言語に伴う頭痛の種がありません。</p>
            <h2>ローンAPI</h2>
            <p>現在の仕事では、ローン申請サービスのためのGo APIを設計しました。簡単に言えば、このAPIはローン申請を作成し、完了まで進行させることができるように設計されています。ソースコードは<a href="https://github.com/paymentassist/paymentassist-go" rel="noreferrer" target="_blank">こちら</a>にあります。</p>
            <h2>利益API</h2>
            <p>前職では、社内ダッシュボード用の新しいGo APIを設計しました。その開発努力の約70%は、財務データを処理するシステムの開発に費やされました。APIは、外部の請求ソリューション（InTime）から入力された請求書、クレジット、リベートを取り込み、公式の月次HMRC為替レートを使用してGBPに変換し、正しいコンサルタントに割り当て、各月のコミッションの支払い額を計算することができました。
            このデータは、指定された期間のグラフとして出力されることもありました。一部のレポートは数万のデータポイントを利用していましたが、キャッシュを慎重に使用することで数秒でロードされました。

            また、APIはメール送信、アカウント権限の管理、CSVアップロードの処理なども担当していました。</p>

            <h2>デーティングアプリAPI</h2>
            <p>友人と一緒に作成したデーティングアプリのAPIを書きました。このアプリは認証、認可、メール送信、アプリデータの提供、そしてもちろんマッチングアルゴリズムの適用を処理しました。</p>
            <iframe src="https://yayornay.se"></iframe>
            <p>また、テストと関連インフラの設定も行いました。特に、Dockerを使用してテストデータベースとAPIのコピーを起動し、さまざまなテストを実行する統合テスターを別のGoプログラムとして持っていました。最初はPowerShellでこの統合テスターを作成しようと考えましたが、スクリプトは実行も開発も遅いことが多く、Goで同じことをするのはわずか100行程度だったため、結局Goで作成しました。</p>
            <p>API自体も非常に強力でした。DigitalOceanにホストされた2コアのサーバーで、テストAPIに5000の同時WebSocket接続を起動するテストを実行しました。その後、各WebSocket接続ごとにメッセージを1つ送信し、各メッセージに複数のデータベース呼び出しを伴うテストを行いました。目標は、5000のメッセージを10秒以内に送信して応答を受け取ることでした。その結果、2.5秒で完了しました。この単一のテストから、理想的な条件下ではサーバーが毎秒約2000のWebSocketリクエストを処理できることが分かりました。</p>
            <p>これはGoに直接関係はありませんが、このプロジェクトでMongoDBと協力するのも素晴らしかったです。Goのタグ機能により、構造体をドキュメントに簡単にマッピングできます。その後、データを挿入すると、魔法のようにデータベースに表示されます。</p>
            <h2>その他の使用例</h2>
            <p>Goを使用した他の事例は以下の通りです：</p>
            <ul>
                <li>2017年に法務アプリのPHPサーバーを置き換えるためにGoの使用を開始しました。</li>
                <li>ゲーム用のボットを作成し、独自のグラフィカルインターフェースを追加しました（自分の楽しみのためだけに）。</li>
            </ul>
            <br/>
            <hr></hr>
            <h2>Goのヒントとコツ</h2>
            <p>Goの経験が増えたので、この部分を削除しようと思っていましたが、あまりにも時間をかけたので、もう少しの間残しておくことにしました。</p>
            <h2>より安全なゲッターとセッターを使った並行アクセス</h2>
            <p>数年前にGoの仕事の面接を受けました。その時の面接官は私に対して少し懐疑的だったと思います。というのも、その時点でGoの商業経験がなかったからです。彼らが面接してくれたことに感謝していますが、正直なところ、なぜ彼らが私を面接しようとしたのかよくわかりませんでした。彼らが本当に私に仕事を与えるつもりがなかったように思います。</p>
            <p>片眉を上げて、彼らが言った一つのことを覚えています。「それで、例えばGoで並行処理を使ったことがありますか？」私はないと言いましたが、他の言語でやったことがあると言いました。そして、それほど難しくないだろうと想像しました。彼らは笑って、「そうだね」と言いました。</p>
            <p>では、並行処理が難しいというのは正しいのでしょうか？いいえ、彼らはただの意地悪でした。しかし、並行処理が常に簡単であるわけではないという点では正しかったです。尊重しないと、噛まれることになります。アメリカン・ブリーXLのように。これはおそらくどのプログラミング言語にも言えることです。</p>
            <p>では、具体的に並行アクセスをどのように対処するのでしょうか？一つのクールな方法は、ゲッターとセッターの背後に並行アクセスを隠すことです。例えば：</p>
                <pre>
                    <code>{`type SomeState struct {
        exampleMap map[string]struct{}
        mapLock    sync.Mutex
    }

    func (someState *SomeState) Initialise() {
        someState.exampleMap = make(map[string]struct{})
    }

    func (someState *SomeState) AddEntry(entry string) {
        someState.mapLock.Lock()
        defer someState.mapLock.Unlock()

        someState.exampleMap[entry] = struct{}{}
    }

    func (someState *SomeState) EntryExists(entry string) bool {
        someState.mapLock.Lock()
        defer someState.mapLock.Unlock()

        _, exists := someState.exampleMap[entry]

        return exists
    }

    func main() {
        state := SomeState{}
        state.Initialise()

        for i := 0; i < 100; i++ {
            print(i, "\\n")

            entryName := "entry" + strconv.Itoa(i)

            go state.AddEntry(entryName)

            go func(entryName string) {
                // Sometimes false, sometimes true.. but no crashes!
                print(state.EntryExists(entryName), "\\n")
            }(entryName)
        }
    }`}
                    </code>
                </pre>
                <p>ゲッターとセッターを使用することで、リソースのロックおよびアンロックを完全に忘れることができます。すべてが自動的に行われます。その結果、ミスやバグが減ります。それだけでなく、<code>.Lock()</code>や<code>.Unlock()</code>をコードに散りばめる必要もありません。また、ロックと保護された値の両方が構造体の未公開フィールドとして存在していることにも注目してください。パッケージ間で通信する場合、直接値を変更できないため、セキュリティの追加レイヤーを提供します！</p>
                <h2>関数型プログラミングパターン</h2>
                <p>C#からGoに移行したときに本当に恋しかったのは、LINQのコレクション操作能力でした。<code>.Where()</code>、<code>.Any()</code>、<code>.Select()</code>などです。これらのパターンは、Elixirのような関数型プログラミング言語の基本ですが、なぜか手続き型やオブジェクト指向プログラミング言語でもますます一般的になっています。おそらく、それが非常に便利だからでしょう。</p>
                <p>残念ながら、Goは現在、無名関数の「=&gt;」構文をサポートしていません（ただし、コミュニティの支持があります<Reference number={5}/>）。しかし、C#と同様の動作をほぼ実現することは可能です。</p>
                <p>例えば、<code>FoodOrder</code>型のスライスがあるとしましょう。各<code>FoodOrder</code>はレストランで注文されたものを記述しています。<code>FoodOrder</code>の（おいしい）結果を記述する<code>Food</code>型も定義しましょう。</p>
                <pre>
                    <code>{`type FoodOrder struct {
        PricePaid int // In pence.
        Name string
        OrderedAt time.Time
    }

    type Food struct {
        Name string
        MadeAt time.Time
    }

    func main() {
        orders := []FoodOrder {
            {
                Name: "Pizza",
                OrderedAt: time.Now().Add(time.Minute * -5),
                PricePaid: 1000
            },
            {
                Name: "Chips",
                OrderedAt: time.Now().Add(time.Minute * -6),
                PricePaid: 300
            },
            {
                Name: "Milkshake",
                OrderedAt: time.Now().Add(time.Minute * -4),
                PricePaid: 600
            },
        }
    }`}
                    </code>
                </pre>
                <p>すべての注文がちょうど完了したとしましょう。各<code>FoodOrder</code>を<code>Food</code>に変換する必要があります。これを範囲ループで行うこともできますが、必然的に定型的になります:</p>
                <pre><code>{`func fulfillOrders(orders []FoodOrder) []Food {
        food := make([]Food, len(orders))

        for i, order := range orders {
            food[i] = Food {
                Name: order.Name,
                MadeAt: time.Now()
            }
        }

        return food
    }`}</code></pre>
        <p>私のお気に入りの方法は、すべての重労働を代わりに行ってくれる汎用関数を実装することです:</p>
        <pre><code>{`func Transform[T interface{}, X interface{}](array []T, transform func(T) X) []X {
        result := make([]X, len(array))
        
        for i := range array {
            result[i] = transform(array[i])
        }
        
        return result
    }

    func fulfillOrders(orders []FoodOrder) []Food {
        return Transform(orders, func (order FoodOrder) Food {
            return Food {
                Name: order.Name,
                MadeAt: time.Now()
            }
        })
    }`}</code></pre>
                <p>このアプローチには複数の利点があります。第一に、このコードはエラーが少なくなります。forループや範囲ループのようにインデックスを誤って操作することがないからです。第二に、少しだけタイプするのが速くなります。第三に、読みやすくなります（ただし、この方法でコードを書いたことがない場合は慣れるまで少し時間がかかるかもしれません）。Goで短縮無名関数の構文がサポートされるようになれば、さらに多くの人がこの方法を採用することは間違いありません。</p>
                <p>納得できませんか？別の例を示します。£3.00以上の注文の数を取得したいとしましょう。</p>
                <p>従来の方法:</p>
                <pre><code>{`// I don't know why anyone would ever write a function that does this but
    // let's just use it as an example.
    func getNumberOfExpensiveOrders(orders []FoodOrder) int {
        number := 0

        for _, order := range orders {
            if order.PricePaid >= 300 {
                number++
            }
        }

        return number
    }`}</code></pre>
        <p>関数型の方法:</p>
        <pre><code>{`func Count[T interface{}](array []T, include func(T) bool) int {
        result := 0
        
        for i := range array {
            if include(array[i]) {
                result++
            }
        }
        
        return result
    }

    // Wow!
    func getNumberOfExpensiveOrders(orders []FoodOrder) int {
        return Count(orders, func (order FoodOrder) bool { 
            return order.PricePaid > 300
        })
    }`}</code></pre>
            <h2>入れ子のパッケージで循環依存を解消する</h2>
            <p>知っているかどうかは分かりませんが（誰も話していないようです）、Goには実際に入れ子のパッケージが存在し、これを利用するとプロジェクトのフォルダ構造をすっきり保ちながら循環依存を分解するのに役立ちます。</p>
            <p>まず、私のGoプロジェクトの構造化アプローチについて説明します。人々は認めたがりませんが、Goは他のほぼすべての点で意見が強い言語であるにもかかわらず、Goプロジェクトを構造化する方法が驚くほど多いのです。多くの人と同様に、私は責任の分離を明確にするためにパッケージを定義するのが好きです。これは、Goでは小文字で始まる関数がパッケージ外部から見えない（エクスポートされない関数）という事実によって役立ちます。これにより、エクスポートされた関数や型を介して外部と対話しながら、実装の詳細を隠すことができます。</p>
            <p>さて、次に物議を醸す意見を述べます。ほとんどの人が私に同意しないと思いますが、Goが循環依存を許さないという事実は間違いなくその最悪の特徴です。もちろん、その理由は理解しています。コンパイル時間の短縮（これには納得していません。複雑なC#ゲームプロジェクトが約5秒でコンパイルされるので）と「より良い」コード<Reference number={6}/>です。循環依存がある場合、それはコード構造について適切に考えられていないことの兆候であると言われることがよくあります。そして、これは一部のケースでは真実ですが、他のケースではこの議論は成り立たないと思います。</p>
            <p>デートアプリのAPIでの実例を説明しましょう。</p>
            <p>以下に循環依存があります。<code>users.BlockUser()</code>が<code>matches.UnmatchUsers()</code>を呼び出し、それが<code>conversations.LeaveAllConversationsWithUser()</code>を呼び出し、それがusersパッケージで定義された<code>users.User</code>型を使用しています。</p>
            <img alt="A cyclical dependency." src="images/cyclic_dependency_1.svg"></img>
            <p>私のポイントは、循環依存は悪いコードの結果ではないということです。明らかに、コードのレイアウトは考え抜かれており、責任の分離が明確です。</p>
            <p>あなたは「私はそんなふうには構造化しないだろう」や「問題は[関数名]が実際には[パッケージ名]に属していることだと思う」などと考えるかもしれません。しかし、これは私のポイントではありません。この循環依存を解決する方法がないとか、別の方法で解決できないと言っているのではありません。私は単に、循環依存が必ずしも悪いコードの結果ではないと言っているだけです。強調したいのは、Goが「悪いコード」を避けるという理由で「良いコード」を許さないという事実であり、これは皮肉なことであり、私の意見では悪い特徴です。（また、他のほぼすべての主流プログラミング言語が何らかの形で循環依存を許可していることも指摘しておきます。）</p>
            <p>そこで、この依存関係の問題を解決する方法が必要です。残念ながら、Goは納得のいく解決策を提供していません。</p>
            <p>一つの解決策は「インターフェースパッケージ」を作成することです。これは、循環パッケージ間の通信を促進し、循環を解消する新しいパッケージを作成する方法です。しばしばインターフェースを使用します<Reference number={7}/>。しかし、これはプロジェクトに意味のないインターフェースと冗長なパッケージ定義の混在をもたらすことが多いです。</p>
            <p>もう一つの解決策は依存性注入です<Reference number={8}/>。これはデータベースやファイルハンドラのようなものには大いに意味があります。なぜなら、テスト中に簡単にモック化できるからです（もしそれが好きなら）。しかし、ほぼすべての他の状況では、再び非常に混乱する解決策です。なぜなら、基本的にすべてのパッケージまたはパッケージの一部をオブジェクトに変えることを含むからです。これにより、コードが非常に複雑になり、注入されたオブジェクトが渡されるためにプログラム状態の混在が発生し、Goの基本原則を破壊します。Goはオブジェクト指向言語ではなく、そのように扱うべきではありません。</p>
            <p>前述のアプローチに似て、<em>「関数注入」</em>と呼ぶ方法でも循環依存を修正することができます。これは、パラメーターとして関数を渡す（またはパッケージレベルの状態を介して）こともあります。これは関数型プログラミングの基本でもあります。例えば、相互に依存する2つのパッケージがあり、その依存関係の1つが他のパッケージへの関数呼び出しである場合、他のパッケージを参照して関数を呼び出す代わりに（循環を引き起こす）、ラップした匿名関数を何らかの経路でパッケージに渡すことができます。これにより、参照するパッケージを直接参照せずに同じ機能を得ることができます。ただし、このパターンは素晴らしい用途がありますが、単に循環依存を解決するためだけに使う場合はほとんど一時しのぎに過ぎません。複雑なコールスタックに匿名関数を渡すと、すぐに混乱して直感的でなくなります。そして理想的には、言語の制限に適合するために苦労するべきではありません。言語は私たちが最も意味のある方法でコードを書くことを可能にするべきです。しかし、この方法は他の方法が努力に値しない状況では迅速かつ便利な修正になることもあります。</p>
            <p>別のアプローチは、複数のパッケージを1つにまとめることです。これは機能しますが、おそらく最後の手段であり、パッケージ間の責任の分離を放棄することになるからです（パッケージ構造が正当化されていたと仮定します）。</p>
            <p>唯一価値のある解決策（ただし、これもあまり気に入っていません）は、問題のあるコードを別のパッケージに分割することです。これは上記の最初のアプローチに似ていますが、インターフェースに頼らないようにします。しかし、プロジェクト構造を混乱させずにそれを行うにはどうすればよいでしょうか？お見せしましょう！</p>
            <p>まず、依存関係の循環を分析します。「最小限のリファクタリング/努力で循環をどう解消するか？」と自問します（もちろん、これは常に唯一の考慮事項ではありませんが、経験上、最も重要です）。この場合、回答はユーザーの型を別のパッケージに配置することで会話パッケージのユーザー依存を解消することです。最初の構造を考えると：</p>
            <pre className="normal-pre">{`/users/users.go`}</pre>
            <p>これを入れ子のパッケージにリファクタリングできます：</p>
            <pre className="normal-pre">{`/users/users.go\n/users/userstypes/userstypes.go`}</pre>
            <p><code>userstypes</code>は新しいパッケージになります。<code>conversations</code>は<code>"myapp/m/v2/users/userstypes"</code>をインポートして使用できます。するとどうでしょう！プロジェクトルートに不要なパッケージフォルダを追加することなく、循環依存を解消しつつ、きちんとしたプロジェクト構造を保つことができます。</p>
            <img alt="A resolved cyclical dependency." src="images/cyclic_dependency_2.svg"></img>
            <h2>参考文献</h2>
            <ol>
                <li id="#ref5"><a href="https://github.com/golang/go/issues/21498" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/21498</a></li>
                <li id="#ref6"><a href="https://github.com/golang/go/issues/30247" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/30247</a></li>
                <li id="#ref7"><a href="https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0" rel="noreferrer" target="_blank">https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0</a></li>
                <li id="#ref8"><a href="https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef" rel="noreferrer" target="_blank">https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef</a></li>
            </ol>
            </div>
        </>
    )
}