import './body.css'
import { CurrentPageContext } from '../../App'
import { useContext } from 'react';
import { SceneState } from '../../background/background';

export const Body: React.FC<{}> = () => {
    const currentPageContext = useContext(CurrentPageContext);

    return (
        <>
            <div className="content-container">
                <h1 style={{textShadow: "2px 2px #"+SceneState.currentPageInfo.skyColour.getHexString()+"aa"}}>{currentPageContext?.currentPage.title}</h1>
                {currentPageContext?.currentPage.content}
            </div>
        </>
    )
}