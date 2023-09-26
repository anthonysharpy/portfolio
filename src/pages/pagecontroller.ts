import { CSharpPage } from "./csharp/csharp"
import { GoPage } from "./go/go"
import { HomePage } from "./home/home"
import { ReactPage } from "./react/react"
import { AboutPage } from "./about/about"
import { ContactPage } from "./contact/contact"

export class Page {
    constructor(public identifer: string, public title: string, public content: React.JSX.Element) {}
}

export const Routes = [
    new Page("home", "Home", HomePage()),
    new Page("go", "Go", GoPage()),
    // Page("csharp", "C#", CSharpPage()),
    new Page("react", "React/Angular", ReactPage()),
    new Page("about", "About", AboutPage()),
    new Page("contact", "Contact", ContactPage()),
    //new Page("ccplusplus", "C/C++", CCPlusPlusPage())
]

export function GetPage(pageIdentifier: string): Page {
    let page = Routes.find(x => x.identifer == pageIdentifier)

    if (page == null) {
        throw Error(`unknown page ${pageIdentifier}`)
    }

    return page
}

