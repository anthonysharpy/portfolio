import './languagepicker.css'
import React, { useContext } from 'react';
import { SiteContext } from '../../pages/globalcontext';
import { PageController } from '../../pages/pagecontroller';

export const LanguagePicker: React.FC = () => {
    const siteContext = useContext(SiteContext);

    const highlightedLanguageStyle = {
        backgroundColor: PageController.getPage(siteContext.currentPage).skyColour.getStyle(),
        color: 'white'
    }

    return (
        <>
            <div className="language-picker">
                <span style={siteContext.currentLanguage == "EN" ? highlightedLanguageStyle : {}} onClick={() => siteContext.setCurrentLanguage("EN")}>English</span>
                <span style={{color: 'rgba(0, 0, 0, 0.19)'}}>|</span>
                <span style={siteContext.currentLanguage == "JP" ? highlightedLanguageStyle : {}} onClick={() => siteContext.setCurrentLanguage("JP")}>日本語</span>
            </div>
        </>
    );
}