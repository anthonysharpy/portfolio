import './headeritem.css'
import { Page } from "../../pages/page";
import { useContext } from 'react';
import { CurrentPageContext } from '../../App';
import { GetPage } from '../../pages/pagecontroller';

interface Props {
    pageName: string
    pageIdentifier: string
}

export const HeaderItem: React.FC<Props> = (props: Props) => {
    const currentPageContext = useContext(CurrentPageContext);

    return (
        <p onClick={() => currentPageContext?.setCurrentPage(GetPage(props.pageIdentifier))} className={currentPageContext?.currentPage.identifer == props.pageIdentifier ? "header-item active" : "header-item"}>{props.pageName}</p>
    );
}