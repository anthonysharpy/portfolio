import { Reference } from "../../components/body/reference/reference";

export function GoPage() {
    return (
        <>
            <p>Go is my favourite programming language. It's fast, low-level, reliable, has a great standard library for modern development tasks like running servers and doesn't come with all the nonsense that languages like C++ do. I first started using it back in 2017 in order to replace the lousy PHP server I made for my law app. Since then I've mostly used it for making REST APIs, but have also used it for other things like making bots and graphical applications.</p>
            <p>I'm going to go over some of my favourite Go tips and tricks, the idea being that hopefully I will say something intelligent along the way.</p>
            <h2>Safe(r) concurrency with getters and setters</h2>
            <p>I had an interview a few years ago for a Go job. The interviewers were clearly sceptical of me, as I had no commercial experience of Go at the time. To be honest, I'm not really sure why they offered to interview me, since I don't think they had any intention of giving me the job. One of the things they said was <i>"So, well, have you for example used things like concurrency in Go?"</i>. I said that I hadn't, but that I had done it in other languages, and said I didn't imagine it would be that hard. They laughed and said <i>"Yeah, right"</i>.</p>
            <p>So, were they right about concurrency being hard? Well, no, they were just jerks. But they were right insofar as to say that concurrency is not always <em>easy</em>. If you don't respect it, it <em>will</em> come back and bite you. Like an American Bully XL. The same is true for probably any programming language.</p>
            <p>So what are some ways I like to tame the beast that is concurrency (Are we still talking about dogs?)? Well, personally, I think implementing getters and setters is actually a perfect way to guard concurrent access. For example:</p>
            <pre>
                <code>{`type SomeState struct {
    exampleMap map[string]struct{}
    mapLock    sync.Mutex
}

func (someState *SomeState) Initialise() {
    someState.mapLock = sync.Mutex{}
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
            <p>When I moved from C# to Go, one of the things I really missed was LINQ's ability to perform operations on collections of objects - things like <code>.Where()</code>, <code>.Any()</code>, <code>.Select()</code>, etcetera.</p>
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
            <p>My preferred approach is to implement a function that does all the heavy lifting for you:</p>
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
            <p>This approach has multiple benefits. Firstly, this code is less error-prone, since you can't accidentally mess up indexing like you can with a for or range loop. Secondly, it is quicker to type. Thirdly, it is easier to read (albeit it might take a bit of getting used to if you've never coded this way before). When support for a short-hand anonymous function syntax does come out with Go, no doubt even more people will be doing it this way.</p>
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
            <h2>Easy-updating objects with MongoDB</h2>
            <p>Just a quick one here.</p>
            <p>If you're mutating objects and storing them in a database (especially with something like MongoDB), then you might be doing something like this:</p>
            <pre>
                <code>{`func BanUser(user User) {
    user.IsBanned = true
    UpdateUser(user) // Write to database.
}`}</code>
            </pre>
            <p>However, have you ever considered doing something like this?</p>
            <pre>
                <code>{`func BanUser(user User) {
    user.IsBanned = true
    user.Update() // Write to database.
}`}</code>
            </pre>
            <p>The behaviour is the same; we've just added a method on the <code>User</code> type. There aren't any astonishing advantages to doing it this way. One advantage to using type methods over regular functions is that IntelliSense helps you find the method you're looking for. Also, personally it feels more natural doing it like this, since updating a <code>User</code> record necessarily involves a <code>User</code> object (and so can most naturally be thought of as something that should belong to the <code>User</code> type). You could even take it a step further and argue that <code>BanUser</code> could be a type method. But let's not get ahead of ourselves...</p>
            <h2>Breaking cyclical dependencies with nested packages</h2>
            <p>You may or may not know this (nobody seems to talk about it), but Go can actually have nested packages, which can be helpful for breaking-up cyclical dependencies whilst also keeping your project's folder structure squeaky-clean.</p>
            <p>Let me begin by explaining my approach to structuring a Go project. People don't like to admit it, but given that Go is such an opinionated language in just about every other regard, it's surprising how many ways you can structure a Go project. Personally I like to define packages so as to demarcate separations of responsibility. This is made useful by the fact that in Go, functions beginning with a lowercase letter are not visible outside of the package (unexported functions). This helps us interact with the outside world via our exported functions and types, whilst keeping all the implementation details hidden.</p>
            <p>Now let me follow that with a controversial opinion. I think most people would disagree with me, but the fact that Go doesn't allow cyclical dependencies is easily its worst feature. Of course, I understand the reasoning behind it - faster compile times (I'm not convinced by this, my complex C# game projects compile in ~5 seconds) and "better" code<Reference number={2}/>. It is often said that if you have cyclical dependencies, it's a symptom of you not having thought about your code structure properly. And while this is true in some cases, in others, I don't think this argument holds water.</p>
            <p>Let me describe a real-world example I had the other day in the API for the dating app I'm currently working on.</p>
            <p>Below we have a cyclical dependency. <code>users.BlockUser()</code> is calling <code>matches.UnmatchUsers()</code>, which is calling <code>conversations.LeaveAllConversationsWithUser()</code>, which is somewhere using the <code>users.User()</code> type defined in the users package.</p>
            <img src="images/cyclic_dependency_1.svg"></img>
            <p>Here's my point: this cyclical dependency isn't the result of bad code. Clearly, the layout of the code <em>has</em> been thought-out, with clear separation of concerns.</p>
            <p>Now, you may be thinking to yourself things like <i>"Oh, well I wouldn't have structured it like that", or "Well, I think the issue is that [insert function here] actually belongs in [insert package name here]"</i>. But this is not my point. I'm not saying that there is no way to resolve this cyclical dependency, or that it couldn't have been done a <em>different</em> way. I'm merely saying that cyclical dependencies aren't necessarily the result of <em>bad</em> code. What I want to stress is the fact that - in this scenario I've just described - Go is disallowing <em>"good code"</em> with the justification that it somehow avoids <em>"bad code"</em>, which is ironic and, in my opinion, just a <em>bad feature</em>. (Also, I would point out that just about every other mainstream programming language allows cyclical dependencies in one form or another.)</p>
            <p>So we need a way to overcome this dependency problem. Unfortunately Go does not provide any convincing solutions.</p>
            <p>One solution is to create "interfacing packages" - new packages that facilitate communication between the cyclical packages in such as way as to break the cycle, often using interfaces<Reference number={3}/>. But this involves polluting your project with a perverted mixture of meaningless interfaces and redundant package definitions.</p>
            <p>Another solution is dependency injection<Reference number={4}/>. This makes a lot of sense for things like database and file handlers, since this allows easy mocking during tests (if you're into that). But in just about every other situation this is again a very messy solution, because it essentially involves reducing every package into an object. This a) makes the code much more complicated, b) introduces a messy assortment of program state since you have all these injected objects being passed around, and c) bastardises the core principles of Go; Go is not an object-oriented language, and should not be treated like one.</p>
            <p>Another approach is to try combining multiple packages into one. This works, although it is probably more of a last-resort, since you'd be abandoning the separation of concerns between your packages (assuming your package structure was justified to begin with).</p>
            <p>The only worthwhile solution I've found (although I'm still not fond of it) is to break the offending code into a separate package. But how do we do that without making our project structure messy? Let me show you!</p>
            <p>First we would do an analysis of the dependency cycle. We ask ourselves <i>"How do we break the cycle with the least amount of refactoring/effort?"</i> (of course, this isn't always the only factor to consider, but experience has taught me that it is the most important). In this case, let's say the answer is to break the conversations package's reliance on users by putting the types from users into a separate package. Given our initial structure:</p>
            <pre className="normal-pre">{`/users/users.go`}</pre>
            <p>We can refactor this into a nested package:</p>
            <pre className="normal-pre">{`/users/users.go\n/users/userstypes/userstypes.go`}</pre>
            <p>userstypes becomes a new package. conversations can use it by importing <code>"myapp/m/v2/users/userstypes"</code>. And voilà! Not only do we keep a tidy project structure since we have not polluted our project root with unnecessary package folders, but we have broken the cyclical dependency.</p>
            <img src="images/cyclic_dependency_2.svg"></img>
            <h2>References</h2>
            <ol>
                <li id="#ref1"><a href="https://github.com/golang/go/issues/21498" target="_blank">https://github.com/golang/go/issues/21498</a></li>
                <li id="#ref2"><a href="https://github.com/golang/go/issues/30247" target="_blank">https://github.com/golang/go/issues/30247</a></li>
                <li id="#ref3"><a href="https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0" target="_blank">https://medium.com/@ishagirdhar/import-cycles-in-golang-b467f9f0c5a0</a></li>
                <li id="#ref4"><a href="https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef" target="_blank">https://medium.com/@bytecraze.com/circular-dependencies-in-golang-e8437f16abef</a></li>
            </ol>
        </>
    )
}