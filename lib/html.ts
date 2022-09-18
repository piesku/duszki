type Interpolation = string | number | boolean | undefined | null | Array<Interpolation>;

function shift(values: Array<Interpolation>) {
    let value = values.shift();
    if (value || value === 0) {
        return value;
    } else {
        return "";
    }
}

/**
 * Template literal tag for generating HTML strings in UI components.
 */
export function htm(strings: TemplateStringsArray, ...values: Array<Interpolation>) {
    return strings.reduce((out, cur) => out + shift(values) + cur);
}
