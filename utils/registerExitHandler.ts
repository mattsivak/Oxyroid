import Logger from '../classes/Logger'

export default function registerExitHandler() {
	let alreadyEnded = false
	function exitHandler(reason: any) {
		if (alreadyEnded) return
		alreadyEnded = true
		Logger.log(
			`Exiting with reason: ${JSON.stringify(reason)}`,
			'INFO',
			'PROCESS'
		)
		setTimeout(() => {
			process.exit(0)
		}, 500)
	}

	//do something when app is closing
	process.on('exit', exitHandler.bind(null, 'exit'))

	//catches ctrl+c event
	process.on('SIGINT', exitHandler.bind(null, 'SIGINT'))

	// catches "kill pid" (for example: nodemon restart)
	process.on('SIGUSR1', exitHandler.bind(null, 'SIGUSR1'))
	process.on('SIGUSR2', exitHandler.bind(null, 'SIGUSR2'))

	process.on('uncaughtException', function (err) {
		Logger.log(err.message, 'ERR', err.stack ? err.stack : 'index')
	})
}
