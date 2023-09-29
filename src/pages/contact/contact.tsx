import { Icon } from '@iconify/react';
import './contact.css'

export function ContactPage() {
    return (
        <>
            <div className="contact-row">
                <Icon icon="gg:phone"/><p>{"+44 7734083797"}</p>
            </div>
            <div className="contact-row">
                <Icon icon="ic:round-email"/><p>{"anthonysharp15@gmail.com"}</p>
            </div>
            <div className="contact-row">
                <Icon icon="icon-park-solid:i-mac"/><p><a href="https://www.linkedin.com/in/anthony-sharpy/" target="_blank">https://www.linkedin.com/in/anthony-sharpy/</a></p>
            </div>
        </>
    )
}