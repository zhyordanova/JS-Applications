function solve() {

    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    };

    async function depart() {
        // get information about next stop
        //display name of next stop

        departBtn.disabled = true;
        label.textContent = 'Loading...'; 

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        stop = await res.json(); 

        label.textContent = `Next stop ${stop.name}`;

        // activate 'Arrive' button disable 'Depart' button
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        //display name of current stop
        label.textContent = `Arriving at ${stop.name}`;

        // activate 'Depart' button disable 'Arrive' button
        departBtn.disabled = false;
        arriveBtn.disabled = arrive;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();