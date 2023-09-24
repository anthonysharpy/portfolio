import { Routes } from "../../pages/routes";
import { HeaderItem } from "./headeritem";
import './header.css'
import { CurrentPageContext } from "../../App";
import { useContext } from 'react';

export const Header: React.FC<{}> = () => {
    const currentPageContext = useContext(CurrentPageContext);

    return (
        <div className="header-container">
            {Routes.map(x =>
                <>
                    <p className="header-bar">|</p>
                    <HeaderItem key={x.identifer} pageName={x.title} pageIdentifier={x.identifer}/>
                </>
            )}
            <p className="header-bar">|</p>
        </div>
    );
}