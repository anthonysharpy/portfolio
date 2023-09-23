import './body.css'
import { HomePage } from '../../pages/home'
import { GoPage } from '../../pages/go' 
import { CSharpPage } from '../../pages/csharp' 
import { GetPage } from '../../pages/pagecontroller'
import { Page } from '../../pages/page'

interface Props {
    currentPage: Page
}

export const Body: React.FC<Props> = (props: Props) => {
    return (
        <div className="content-container">
            <h1>{props.currentPage.title}</h1>
            {props.currentPage.content}
        </div>
    )
}