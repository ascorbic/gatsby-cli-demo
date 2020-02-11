import { Item } from "ink-select-input";

export interface Question {
    question: string;
    multi: boolean;
    label: string;
    key: string;
    options: Item[];
}

declare const questions: Question[];

export default questions;
