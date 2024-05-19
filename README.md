# Overview
A docker container that [Prometheus](https://prometheus.io/) can scrape to collect the current weather data using the [OpenWeatherMap OneCall Api v3.0](https://openweathermap.org/api/one-call-3).

# Setup
1. docker compose up --build
2. point your prometheus docker to this docker:4115/current
3. provide the container with the following environment variables:
    - LATITUDE: of the location you want the weather for
    - LONGITUDE: of the location you want the weather for
    - API_KEY: OpenWeatherMap OneCall API v3 key

as per your prometheus config, the data will be pulled from OpenWeatherMap.

example config for prometheus

``` yaml
scrape_configs:
  - job_name: 'openweathermap'
    # 
    scrape_interval: 5m
    metrics_path: '/current'
    static_configs:
      - targets: ['ip.of.your.docker:4115']
```