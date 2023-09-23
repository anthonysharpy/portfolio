import { Page } from "../../pages/page";
import { Routes } from "../../pages/routes";
import { HeaderItem } from "./headeritem";
import './header.css'

interface Props {
    currentPage: Page
}

export const Header: React.FC<Props> = (props: Props) => {
    return (
        <div className="header-container">
            {Routes.map(x => <HeaderItem key={x.identifer} pageName={x.title} active={x.identifer == props.currentPage.identifer}/>)}
        </div>
    );
}