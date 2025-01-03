async function getInfo() {

    let busStopId = document.getElementById(`stopId`).value;
    let stopName = document.getElementById(`stopName`);
    let buses = document.getElementById(`buses`);

    let url = `http://localhost:3030/jsonstore/bus/businfo/${busStopId}`;

    try {

        let data = await fetch(url);

        if (!data.ok) {
            
            throw new Error(`Error`)
        }

        let res = await data.json();
        stopName.textContent = res.name;
        buses.replaceChildren();

        for (const key in res[`buses`]) {

            let li = document.createElement(`li`);
            li.textContent = `Bus ${key} arrives in ${res[`buses`][key]} minutes`
            console.log(key);
            
            buses.appendChild(li);
        }

    } catch (error) {

        buses.replaceChildren();
        stopName.textContent = `Error`;
    }
}