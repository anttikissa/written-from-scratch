// We need http to serve HTTP requests
let http = require('http')

// We need fs to read our files
let fs = require('fs')

let server = http.createServer((req, res) => {
	if (!req.url.match(/^[a-zA-Z0-9-_.\/]+$/) || req.url.includes('..')) {
		res.statusCode = 403
		return res.end('Nope')
	}

	let filename = __dirname + req.url

	fs.readFile(filename, (err, file) => {
		if (file) {
			res.setHeader(
				'Content-Type',
				filename.endsWith('.html')
					? 'text/html'
					: filename.endsWith('.js')
					? 'application/javascript'
					: 'text/plain'
			)
			res.end(file)
		} else {
			res.statusCode = 404
			res.end('File not found')
		}
	})
})

server.listen(1234)
