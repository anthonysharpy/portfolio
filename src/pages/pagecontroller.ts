import { CSharpPage } from "./csharp"
import { GoPage } from "./go"
import { HomePage } from "./home"
import { Page } from "./page"
import { Routes } from "./routes"

export function GetPage(pageIdentifier: string): Page {
    let page = Routes.find(x => x.identifer == pageIdentifier)

    if (page == null) {
        throw Error(`unknown page ${pageIdentifier}`)
    }

    return page
}

