import * as https from "https"
import * as querystring from "querystring"

export class LineNotify {
    private token;
    constructor(token) {
        this.token = token;
    }

    public sendMessage(text: string) {
        const content = querystring.stringify({
            message: text
        })

        const options = {
            hostname: "notify-api.line.me",
            path: "/api/notify",
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(content),
                "Authorization": `Bearer ${this.token}`
            }
        }

        const request = https.request(options, res => {
            res.setEncoding("utf8")
            res.on("error", console.log)
        })

        request.write(content)
        request.end()
    }
}