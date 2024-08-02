import { CSharpPage } from "./csharp/csharp"
import { GoPage } from "./go/go"
import { HomePage } from "./home/home"
import { ReactPage } from "./react/react"
import { ContactPage } from "./contact/contact"
import { CCPlusPlusPage } from "./cplusplus/ccplusplus"
import { WorkExperiencePage } from "./workexperience/workexperience"
import { InfrastructurePage } from "./infrastructure/infrastructure"
import { Color } from "three"

export class Page {
    constructor(public identifer: string,
        public title: string,
        public content: React.JSX.Element,
        public skyColour: Color,
        public floorColour: Color,
        public meteorColour: Color,
        public ballColour: Color) {}
}

export const Routes = [
    // Haven't implemented a lot of this, I might do eventually.
    new Page("home", "Home", HomePage(), new Color('skyblue'), new Color('white'), new Color('white'), new Color('red')),
    new Page("go", "Go", GoPage(), new Color("rgb(106, 223, 108)"), new Color('white'), new Color('white'), new Color('#8c6b37')),
    new Page("csharp", "C#", CSharpPage(), new Color("rgb(149, 135, 235)"), new Color('white'), new Color('white'), new Color('#2b3a69')),
    new Page("infrastructure", "Infrastructure and Hosting", InfrastructurePage(), new Color("rgb(234, 184, 241)"), new Color('white'), new Color('white'), new Color('#ffffff')),
    new Page("react", "React/Angular", ReactPage(), new Color("rgb(131, 171, 185)"), new Color('white'), new Color('white'), new Color('#4d7057')),
    new Page("ccplusplus", "C/C++", CCPlusPlusPage(), new Color("rgb(241, 132, 151)"), new Color('white'), new Color('white'), new Color('#745691')),
    //new Page("workexperience", "Work Experience", WorkExperiencePage(), new Color("rgb(239, 177, 86)"), new Color('white'), new Color('white'), new Color('#eb8d6e')),
    new Page("contact", "Contact", ContactPage(), new Color("rgb(219, 117, 233)"), new Color('white'), new Color('white'), new Color('#986ee0')),
]

export function GetPage(pageIdentifier: string): Page {
    let page = Routes.find(x => x.identifer === pageIdentifier)

    if (page == null) {
        throw Error(`unknown page ${pageIdentifier}`)
    }

    return page
}

