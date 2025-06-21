export const SCHOOL_TYPES = {
    GYMNASIUM: 'GYMNASIUM',
    LYCEUM: 'LYCEUM',
    GENERAL_SECONDARY: 'GENERAL_SECONDARY'
};

export const SCHOOL_TYPE_LABELS = {
    [SCHOOL_TYPES.GYMNASIUM]: 'Гімназія',
    [SCHOOL_TYPES.LYCEUM]: 'Ліцей',
    [SCHOOL_TYPES.GENERAL_SECONDARY]: 'ЗЗСО'
};

export const SCHOOL_TYPE_OPTIONS = Object.entries(SCHOOL_TYPE_LABELS).map(
    ([value, label]) => ({value, label})
);