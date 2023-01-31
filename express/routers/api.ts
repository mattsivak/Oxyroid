import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const api = Router()

api.get('/hello', (_req, res) => {
	res.send({ message: 'Hello' })
})

api.get('/logs', (_req, res) => {
	const files = fs.readdirSync(path.join(__dirname, '../../../storage/logs/'))

	res.json(files)
})

api.get('/logs/:query', (req, res) => {
	const query = req.params.query
	const exists = fs.existsSync(
		path.join(__dirname, '../../../storage/logs', query)
	)

	if (exists) {
		const data = fs.readFileSync(
			path.join(__dirname, '../../../storage/logs', query),
			'utf8'
		)
		res.json(data.split('\n'))
	} else {
		res.json({
			error: 404,
			message: 'Log not found.'
		})
	}
})

export default api
