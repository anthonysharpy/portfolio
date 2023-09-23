import { Page } from "./page"
import { HomePage } from "./home"
import { GoPage } from "./go"
import { CSharpPage } from "./csharp"

export const Routes = [
    new Page("home", "Home", HomePage()),
    new Page("go", "Golang", GoPage()),
    new Page("csharp", "C#", CSharpPage())
]