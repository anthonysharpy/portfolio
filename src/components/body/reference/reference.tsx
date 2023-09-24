import { useRef } from "react";

interface Props {
    number: number
}

export function Reference(props: Props) {
    const ref = useRef(null);
    const elementID = "#ref" + props.number

    const scrollToLink = () => {
        document.getElementById(elementID)?.scrollIntoView({behavior: 'smooth'})
    };

    return (
        <sup><a onClick={scrollToLink} href={elementID}>[{props.number}]</a></sup>
    )
}