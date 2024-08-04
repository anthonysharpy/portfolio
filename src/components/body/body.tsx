import './body.css'
import { SiteContext } from '../../pages/globalcontext';
import { useContext } from 'react';
import { SceneState } from '../../background/background';
import { PageController } from '../../pages/pagecontroller';
import { LanguagePicker } from '../languagepicker/languagepicker';

export const Body: React.FC<{}> = () => {
    const siteContext = useContext(SiteContext);

    return (
        <>
            <div className="content-container">
                <LanguagePicker/>
                <h1 style={{textShadow: "2px 2px #"+SceneState.currentPageInfo.skyColour.getHexString()+"aa"}}>{PageController.getPage(siteContext?.currentPage).title}</h1>
                {PageController.getPage(siteContext?.currentPage).content}
            </div>
        </>
    )
}