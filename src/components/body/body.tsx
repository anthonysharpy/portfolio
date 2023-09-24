import './body.css'
import { CurrentPageContext } from '../../App'
import { useContext } from 'react';

export const Body: React.FC<{}> = () => {
    const currentPageContext = useContext(CurrentPageContext);

    return (
        <div className="content-container">
            <h1>{currentPageContext?.currentPage.title}</h1>
            {currentPageContext?.currentPage.content}
        </div>
    )
}