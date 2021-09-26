// Should include msMaxTouchPoints but since we're so incompatible with IE, why bother
export const isTouchable = 'ontouchstart' in window || navigator.maxTouchPoints;

// Maybe make it a function if I need it check on runtime when devices are added, etc
