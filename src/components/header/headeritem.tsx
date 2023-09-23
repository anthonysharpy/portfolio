import './headeritem.css'
import { Page } from "../../pages/page";

interface Props {
    pageName: string
    active: boolean
}

export const HeaderItem: React.FC<Props> = (props: Props) => {
    return (
        <p className={props.active? "header-item active" : "header-item"}>{props.pageName}</p>
    );
}