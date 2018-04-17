export function getCities() {
    return {
        type: 'GET_CITIES',
        payload: fetch('files/cities.json')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
                    return response.json();
                }
            )
            .catch(function (error) {
                return error;
            })
    }
}