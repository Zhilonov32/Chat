export function setUrlParam(key, value) {
    window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?${key}=${value}`,
    );
}

export function getUrlParam() {
    return Object.fromEntries(
        new URL(window.location).searchParams.entries(),
    );
}

export function getUrlParamItem(key) {
    return new URL(window.location).searchParams.get(key) ?? null;
}
