const axios = require('axios')
const http = require('http')

currentWeatherCall = () => {return `https://api.openweathermap.org/data/3.0/onecall?lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.API_KEY}&units=metric`}
foreCastCall= () => { return `https://api.openweathermap.org/data/3.0/onecall??lat=${process.env.LATITUDE}&lon=${process.env.LONGITUDE}&appid=${process.env.API_KEY}&units=metric` }

const ntfyAddress = process.env.NTFY_ADDRESS
const ntfyToken = process.env.NTFY_TOKEN

getCurrentWeather = (res) => {
    console.log ("checking " + process.env.LATITUDE)
    axios.get(currentWeatherCall()).then(response  => {
        const current = response.data.current
        res.writeHead(200,{'Content-Type': 'text/plain'})

        for (param in current) {
            if (typeof current[param] !== 'object') {
                res.write("current_" + param + " " + current[param]+ "\n")
            }
        } 
        res.end()

    })
}


http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === "/current") {
        getCurrentWeather(res)
        return
    }
}).listen(4115)