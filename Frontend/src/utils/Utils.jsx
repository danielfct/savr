export function timedFetch(url, options, timeout = 7000) {
    return new Promise((resolve, reject) => {
        fetch(url, options).then(resolve).catch(reject);
        if (timeout) {
            const e = new Error("A conexão excedeu o limite de tempo.");
            setTimeout(reject, timeout, e);
        }
    });
}

export function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export function getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0'+dd
    }
    if (mm < 10) {
        mm = '0'+mm
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
}