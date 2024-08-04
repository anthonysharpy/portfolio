interface Props {
    number: number
}

export function Reference(props: Props) {
    const elementID = "#ref" + props.number

    const scrollToLink = () => {
        document.getElementById(elementID)?.scrollIntoView({behavior: 'smooth'})
    };

    return (
        <sup><a onClick={scrollToLink} href={elementID}>[{props.number}]</a></sup>
    )
}