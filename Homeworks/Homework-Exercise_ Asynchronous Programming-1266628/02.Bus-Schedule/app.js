function solve() {

    let info = document.getElementById(`info`);
    let departBtn = document.getElementById(`depart`);
    let arriveBtn = document.getElementById(`arrive`);

    let stop = {
        
        next: `depot`
    };

    async function depart() {
        
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        let data = await fetch(url);
        stop = await data.json();

        departBtn.disabled = true;
        arriveBtn.disabled = false;

        info.textContent = `Next stop ${stop.name}`;
    }

    function arrive() {
        
        info.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();