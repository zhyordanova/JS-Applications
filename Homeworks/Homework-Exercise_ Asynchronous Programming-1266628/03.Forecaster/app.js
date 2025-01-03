async function attachEvents() {



    let input = document.getElementById(`location`);
    let forecastDiv = document.getElementById(`forecast`);
    let submitBtn = document.getElementById(`submit`);
    let current = document.getElementById(`current`);
    let upcoming = document.getElementById(`upcoming`);

    submitBtn.addEventListener(`click`, async () => {

        let url = `http://localhost:3030/jsonstore/forecaster/locations`;

        let data = await fetch(url);
        let ret = await data.json();
        let location = ret.find(x => x.name == input.value)

        try {


            if (!location) {

                throw new Error;
            }

            forecastDiv.style.display = `block`;
            forecastDiv.innerHTML = '<div id="current"><div class="label">Current conditions</div></div><div id="upcoming"><div class="label">Three-day forecast</div></div>';
            input.value = ``;

            let conditionsUrl = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`

            fetch(conditionsUrl)
                .then(x => x.json())
                .then(x => {

                    let symbol = ``;
                    switch (x[`forecast`][`condition`]) {

                        case `Sunny`:
                            symbol = `\u2600`;
                            break;
                        case `Partly sunny`:
                            symbol = `\u26C5`;
                            break;
                        case `Overcast`:
                            symbol = `\u2601`;
                            break;
                        case `Rain`:
                            symbol = `\u2614`;
                            break;
                        default:
                            break;
                    }

                    let div = document.createElement(`div`);
                    div.classList.add(`forecasts`);

                    let condSimbol = document.createElement(`span`);
                    condSimbol.className = `condition symbol`;
                    condSimbol.textContent = `${symbol}`;

                    let condition = document.createElement(`span`);
                    condition.classList.add(`condition`);

                    let spanName = document.createElement(`span`);
                    spanName.classList.add(`forecast-data`);
                    spanName.textContent = `${x[`name`]}`;

                    let spanTemp = document.createElement(`span`);
                    spanTemp.classList.add(`forecast-data`);
                    spanTemp.textContent = `${x[`forecast`][`low`]}\u00B0/${x[`forecast`][`high`]}\u00B0`;

                    let spanWeather = document.createElement(`span`);
                    spanWeather.classList.add(`forecast-data`);
                    spanWeather.textContent = `${x[`forecast`][`condition`]}`;

                    condition.appendChild(spanName);
                    condition.appendChild(spanTemp);
                    condition.appendChild(spanWeather);

                    div.appendChild(condSimbol);
                    div.appendChild(condition);

                    forecastDiv.children[0].appendChild(div);
                })

            let threeDayUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
            fetch(threeDayUrl)
                .then(x => x.json())
                .then(x => {

                    let div = document.createElement(`div`);
                    div.classList.add(`forecast-info`);

                    let spanUpcoming = document.createElement(`span`);
                    spanUpcoming.classList.add(`upcoming`);

                    for (let i = 0; i < 3; i++) {

                        let symbol = ``;
                        switch (x[`forecast`][i][`condition`]) {

                            case `Sunny`:
                                symbol = `\u2600`;
                                break;
                            case `Partly sunny`:
                                symbol = `\u26C5`;
                                break;
                            case `Overcast`:
                                symbol = `\u2601`;
                                break;
                            case `Rain`:
                                symbol = `\u2614`;
                                break;
                            default:
                                break;
                        }
                        let spanSymbol = document.createElement(`span`);
                        spanSymbol.classList.add(`symbol`);
                        spanSymbol.textContent = symbol;

                        let spanTemp = document.createElement(`span`);
                        spanTemp.classList.add(`forecast-data`);
                        spanTemp.textContent = `${x[`forecast`][i][`low`]}\u00B0/${x[`forecast`][i][`high`]}\u00B0`;

                        let spanWeather = document.createElement(`span`);
                        spanWeather.classList.add(`forecast-data`);
                        spanWeather.textContent = `${x[`forecast`][i][`condition`]}`;

                        spanUpcoming.appendChild(spanSymbol);
                        spanUpcoming.appendChild(spanTemp);
                        spanUpcoming.appendChild(spanWeather);
                    }

                    div.appendChild(spanUpcoming);

                    forecastDiv.children[1].appendChild(div);
                    console.log(x);
                })
        } catch {

            forecastDiv.style.display = `block`;
            forecastDiv.innerHTML = '<div id="current"><div class="label">ERROR</div>';
            input.value = ``;
        }
    })

}

attachEvents();