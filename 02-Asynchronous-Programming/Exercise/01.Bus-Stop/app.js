async function getInfo() {
    // read input value
    const stopId = document.getElementById('stopId').value;

    // make request to server
    const url = `http://localhost:3030/jsonstore/bus/businfo/` + stopId;

    // parse response data
    // display data
    // * error checking for request

    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    try {
        stopNameElement.textContent = 'Loading...';
        timeTableElement.replaceChildren();

        const res = await fetch(url);
        if (res.ok == false) {
            throw new Error(`${res.status} ${res.message}`);
        }
        const data =  await res.json();
    
        stopNameElement.textContent = data.name;
        Object.entries(data.buses).forEach(([busId, bustime]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${bustime} minutes`;

            timeTableElement.appendChild(liElement);
        })

    } catch(error) {
        stopNameElement.textContent = 'Error'
    }
}