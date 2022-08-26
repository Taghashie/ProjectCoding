     function formatDate(date) {
                let hours = date.getHours();
                if (hours < 10) {
                    hours = `0${hours}`;
                }
                let minutes = date.getMinutes();
                if (minutes < 10) {
                    minutes = `0${minutes}`;
                }

                let dayIndex = date.getDay();
                let days = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ];
                let day = days[dayIndex];

                return `${day} ${hours}:${minutes}`;
            }

            function weatherCondition(response) {
                document.querySelector("#city").innerHTML = response.data.name;
                document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

                document.querySelector("#hum").innerHTML = response.data.main.humidity;
                document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
                document.querySelector("#description").innerHTML = response.data.weather[0].main;

                document.querySelector("#rise").innerHTML = response.data.main.icon;
                document.querySelector("#set").innerHTML = response.data.main.sunset;
            }

            function searchCity(city) {
                let apiKey = "1198758847d63b62f48537f6840537aa";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
                axios.get(apiUrl).then(weatherCondition);
            }

            function search(event) {
                event.preventDefault();
                let city = document.querySelector("#city-input").value;
                searchCity(city);
            }

            function searchLocation(position) {
                let apiKey = "1198758847d63b62f48537f6840537aa";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

                axios.get(apiUrl).then(weatherCondition);
            }

            function getCurrentLocation(event) {
                event.preventDefault();
                navigator.geolocation.getCurrentPosition(searchLocation);
            }

            let dateElement = document.querySelector("#date");
            let currentTime = new Date();
            dateElement.innerHTML = formatDate(currentTime);

            let searchForm = document.querySelector("#search-form");
            searchForm.addEventListener("submit", search);

            let currentLocationButton = document.querySelector("#current-location-button");
            currentLocationButton.addEventListener("click", getCurrentLocation);

            searchCity("London");