import { Reference } from "../../components/body/reference/reference";
import './go.css';

export function GoPage() {
    return (
        <div className="go-page-content">
            <p>Go is my favourite programming language. It's fast, (relatively) low-level, has great error handling, has an awesome standard library for modern development tasks like running servers and doesn't come with all the nonsense that languages like C++ do. I first started using it back in 2017 in order to replace the PHP server I made for my law app. Since then I've mostly used it for making REST APIs, but have also used it for other things like making bots and graphical applications.</p>
            <p>I'm going to go over some of my favourite Go tips and tricks, the idea being that hopefully I will say something intelligent along the way. But first let me introduce a cool project that I'm working on right now...</p>
            <h2>YayOrNay</h2>
            <p>YayOrNay is a novel dating app built in Go and Vue.js. Obviously I'm not really able to share the source code or give away the secret-sauce behind our algorithm. But I can speak geeky words at you about it.</p>
            <iframe src="https://yayornay.se"></iframe>
            <p>We were impressed the other day to learn how capable our server is at the moment, even with our cheap, 2-virtual-CPU, 2GB-RAM DigitalOcean hosting. But first, let me explain our test setup. We have an integration tester that spins up a test database and a copy of the API to perform all kinds of whacky tests to make sure everything's working properly. I originally thought about making this integration tester in PowerShell, but in the end, I just made a fully-fledged Go program for it instead, since scripting is slow at the best of times (both to run and to develop), and the same thing in Go was only a hundred lines of code or so, not including the tests themselves.</p>
            <p>Anyways, so in one of our tests we managed to spin up 5,000 concurrent WebSocket connections to the test API. Once we had done that, we sent out one message per WebSocket connection (each of which also involved multiple database calls, might I add!). Our goal: to send and receive a response for these 5,000 messages in under 10 seconds. The verdict? It completed in 2.5 seconds. Very nice! From this single test, it would seem that the server can handle roughly 2,000 WebSocket requests per second. But we have to bear in mind that not all our endpoints are WebSockets, and that obviously a connection over LAN with a test database is not indicative of real-world performance, so we have to take this with a grain of salt. But it gives us confidence that our server could likely handle 1,000-5,000 users active at the same time. Sure, it's not the next Facebook, but we do have a clear upgrade path if we need to increase the power of the server, and for $21/month, it's certainly not bad! So long as we stay under our 3 TB monthly data limit that is... although because of that we will be hosting things like images and videos elsewhere (likely using AWS S3).</p>
            <p>It's been great working with MongoDB on this project. The tags feature in Go lets you easily map your structs to your documents. And you don't even need to create a schema for it. Just insert the data and it's there. Storing non-normalised objects as documents also just makes a lot of sense for a lot of use-cases, and often proves itself to be simpler (and occasionally faster) than the spaghetti data you can end up having with SQL databases. All that being said, MongoDB is an absolute pain to configure. Want to add a root user? Sorry, you have to shut the database off, disable authentication and restart it first! Want to enable transactions? Sorry, you have to shut the database off, configure a replica set and restart it first! Want to configure a replica set? Sorry, you have to create a keyfile first! Once you start to learn these quirks though, it's really not too bad.</p>

            <h2>Safe(r) concurrent access with getters and setters</h2>
            <p>I had an interview a few years ago for a Go job. I think the interviewers were a little bit sceptical of me, as I had no commercial experience of Go at the time. I'm grateful they did, but to be honest, I'm not really sure why they offered to interview me, since I don't think they really had any intention of giving me the job.</p>
            <p>With one eyebrow raised, I remember one of the things they said was <i>"So, well, have you for example used things like concurrency in Go?"</i>. I said that I hadn't, but that I had done it in other languages, and said I didn't imagine it would be too hard. They laughed and said <i>"Yeah, right"</i>.</p>
            <p>So, were they right about concurrency being hard? Well, no, they were just jerks. But they were right insofar as to say that concurrency is not always <em>easy</em>. If you don't respect it, it <em>will</em> come back and bite you. Like an American Bully XL. The same is true for probably any programming language.</p>
            <p>So how <em>do</em> you deal with concurrency - specifically, concurrent access? Well, personally I think implementing getters and setters is actually a perfect way to guard concurrent access. For example:</p>
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
            <p>By using getters and setters we can completely forget about having to lock and unlock the resource. It's all done for us. This results in fewer mistakes and fewer bugs! Not only that, but we didn't have to pollute our code with <code>.Lock()</code> and <code>.Unlock()</code> everywhere. Notice also how both the lock and the protected value exist as unexported fields in a struct. This adds an extra layer of security as you can't modify the value directly even if you want to!</p>
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
            <p>Let me describe a real-world example I had the other day in the API for the dating app I'm currently working on.</p>
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
            <p>userstypes becomes a new package. conversations can use it by importing <code>"myapp/m/v2/users/userstypes"</code>. And voilà! Not only do we keep a tidy project structure since we have not polluted our project root with unnecessary package folders, but we have broken the cyclical dependency.</p>
            <img alt="A resolved cyclical dependency." src="images/cyclic_dependency_2.svg"></img>
            <h2>References</h2>
            <ol>
                <li id="#ref1"><a href="https://github.com/golang/go/issues/21498" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/21498</a></li>
                <li id="#ref2"><a href="https://github.com/golang/go/issues/30247" rel="noreferrer" target="_blank">https://github.com/golang/go/issues/30247</a></li>
                <li id="#ref3"><a href="https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0" rel="noreferrer" target="_blank">https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0</a></li>
                <li id="#ref4"><a href="https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef" rel="noreferrer" target="_blank">https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef</a></li>
            </ol>
        </div>
    )
}