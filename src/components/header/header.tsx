import { Routes } from "../../pages/pagecontroller";
import { HeaderItem } from "./headeritem";
import './header.css'
import { CurrentPageContext } from "../../App";
import { useContext } from 'react';

export const Header: React.FC<{}> = () => {
    const currentPageContext = useContext(CurrentPageContext);

    return (
        <>
            <p className="centered name">Anthony Sharp</p>
            <div className="header-container">
                {Routes.map(x =>
                    <>
                        <HeaderItem key={x.identifer} pageName={x.title} pageIdentifier={x.identifer}/>
                    </>
                )}
            </div>
        </>
    );
}