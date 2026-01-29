import './headeritem.css'
import { useContext } from 'react';
import { SiteContext } from '../../pages/globalcontext';

interface Props {
    pageName: string
    pageIdentifier: string
}

export const HeaderItem: React.FC<Props> = (props: Props) => {
  const siteContext = useContext(SiteContext);

  return (
    <p onClick={() => siteContext?.setCurrentPage(props.pageIdentifier)} className={siteContext?.currentPage === props.pageIdentifier ? "header-item active" : "header-item"}>{props.pageName}</p>
  );
}