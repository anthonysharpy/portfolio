import { PageController } from "../../pages/pagecontroller";
import { HeaderItem } from "./headeritem";
import './header.css'

export const Header: React.FC<{}> = () => {
    return (
        <>
            <p className="centered name">Anthony Sharp</p>
            <div className="header-container">
                {PageController.getRoutes().map(x => <HeaderItem key={x.identifer} pageName={x.title} pageIdentifier={x.identifer}/>)}
            </div>
        </>
    );
}