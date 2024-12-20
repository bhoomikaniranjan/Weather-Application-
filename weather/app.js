angular.module('weatherApp', [])
  .controller('WeatherController', ['$scope', '$http', function ($scope, $http) {
    $scope.isCelsius = true;
    $scope.temperatureUnit = '°C';
    $scope.loading = false;

    $scope.getWeather = function () {
      const apiKey = '1d809cb6ec1c95c051718ffe804ece5a';
      const city = $scope.city;

      if (!city) {
        alert('Please enter a city name');
        return;
      }

      $scope.loading = true;

      $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
          $scope.weatherData = response.data;
          $scope.loading = false;
        })
        .catch(function (error) {
          console.error('Error fetching weather data:', error);
          alert('Error fetching weather data. Please try again.');
          $scope.loading = false;
        });

      $http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(function (response) {
          $scope.forecastData = response.data;
        })
        .catch(function (error) {
          console.error('Error fetching forecast data:', error);
        });
    };

    $scope.convertTemperature = function (kelvin) {
      return $scope.isCelsius ? (kelvin - 273.15).toFixed(2) : ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
    };

    $scope.toggleTemperatureUnit = function () {
      $scope.temperatureUnit = $scope.isCelsius ? '°C' : '°F';
    };

    $scope.getCurrentDateTime = function () {
      const now = new Date();
      return now.toLocaleString();
    };

    $scope.getWeatherIconUrl = function (iconCode) {
      return `http://openweathermap.org/img/w/${iconCode}.png`;
    };

    $scope.getFormattedTime = function (timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString();
    };

    $scope.refreshWeather = function () {
      alert('Refreshing weather...');
    };

    $scope.shareWeather = function () {
      if (navigator.share) {
        navigator.share({
          title: 'Weather Information',
          text: `Current weather in ${$scope.weatherData.name}: ${$scope.weatherData.weather[0].description}, ${$scope.convertTemperature($scope.weatherData.main.temp)} ${$scope.temperatureUnit}`,
          url: window.location.href
        }).then(() => console.log('Weather info shared successfully'))
          .catch((error) => console.error('Error sharing weather info:', error));
      } else {
        alert('Sharing is not supported on this browser.');
      }
    };

    $scope.showError = function (message) {
      $scope.errorMessage = message;
      $scope.errorVisible = true;
      $scope.loading = false;
    };

    $scope.getWeather = function () {
      const apiKey = '1d809cb6ec1c95c051718ffe804ece5a';
      const city = $scope.city;

      if (!city) {
        $scope.showError('Please enter a city name');
        return;
      }

      $scope.loading = true;
      $http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
          $scope.weatherData = response.data;
          $scope.loading = false;
        })
        .catch(function (error) {
          console.error('Error fetching weather data:', error);
          $scope.showError('Error fetching weather data. Please try again.');
        });

      $http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(function (response) {
          $scope.forecastData = response.data;
        })
        .catch(function (error) {
          console.error('Error fetching forecast data:', error);
        });
    };
  }]);
