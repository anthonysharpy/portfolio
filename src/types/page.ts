import { Color } from "three"

export class Page {
    constructor(public identifer: string,
        public title: string,
        public content: React.JSX.Element,
        public skyColour: Color,
        public floorColour: Color,
        public meteorColour: Color,
        public ballColour: Color
    ) {}
}
