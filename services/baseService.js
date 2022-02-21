const https = require('https');

class baseService {
    baseUrl = '';

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async post(url, data) {
        return new Promise((resolve, reject) => {
            const options = this.getHttpOptions(url, 'POST', data);

            const req = https.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
                
                res.on('data', d => {
                    console.log(d);
                })
            })
            
            req.on('error', error => {
                console.error(error);
            })
            
            req.write(JSON.stringify(data));
            req.end();
        });
    }

    getHttpOptions(url, method, data) {
        let dataStr = '';
        if (data) {
            dataStr = JSON.stringify(data);
        }
        const options = {
            hostname: this.baseUrl,
            port: 443,
            path: `/${url}`,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataStr.length
            }
        }
        return options;
    }
}

module.exports.baseService = baseService;