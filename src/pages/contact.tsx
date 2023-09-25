import { Icon } from '@iconify/react';
import './contact.css'

export function ContactPage() {
    return (
        <>
            <div className="contact-row">
                <Icon icon="gg:phone" /><p>{" +44 7734083797"}</p>
            </div>
            <div className="contact-row">
                <Icon icon="ic:round-email" /><p>{" anthonysharp15@gmail.com"}</p>
            </div>
        </>
    )
}