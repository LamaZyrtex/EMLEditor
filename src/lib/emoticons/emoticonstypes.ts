

export interface IHiddenEmoticons {
    ':whistling:': string;
    ':love:': string;
}

export interface IMoreEmoticons {
    ':alien:': string;
    ':blink:': string;
    ':blush:': string;
    ':cheerful:': string;
    ':devil:': string;
    ':dizzy:': string;
    ':getlost:': string;
    ':happy:': string;
    ':kissing:': string;
    ':ninja:': string;
    ':pinch:': string;
    ':pouty:': string;
    ':sick:': string;
    ':sideways:': string;
    ':silly:': string;
    ':sleeping:': string;
    ':unsure:': string;
    ':woot:': string;
    ':wassat:': string;
}

export interface IDropdownEmoticons {
    ':)': string;
    ':angel:': string;
    ':angry:': string;
    '8-)': string;
    ':ermm:': string;
    ':D': string;
    '<3': string;
    ':(': string;
    ':O': string;
    ':P': string;
    ';)': string;
}

export interface IEmoticonGroups {
    dropdown: IDropdownEmoticons;
    more: IMoreEmoticons;
    hidden: IHiddenEmoticons;
}

export type AllEmoticonKeys = Record<keyof IDropdownEmoticons | keyof IHiddenEmoticons | keyof IMoreEmoticons, string>