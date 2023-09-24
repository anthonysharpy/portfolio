import { Page } from "./page"
import { HomePage } from "./home"
import { GoPage } from "./go"
import { CSharpPage } from "./csharp"
import { ReactPage } from "./react"
import { CCPlusPlusPage } from "./ccplusplus"

export const Routes = [
    new Page("home", "Home", HomePage()),
    new Page("go", "Go", GoPage()),
    // Page("csharp", "C#", CSharpPage()),
    new Page("react", "React", ReactPage()),
    //new Page("ccplusplus", "C/C++", CCPlusPlusPage())
]
