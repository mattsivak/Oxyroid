import {
	GuildBasedChannel,
	Snowflake,
	TextChannel,
	VoiceChannel
} from 'discord.js'
import { Player, QueryType } from 'discord-player'
import ytdl from 'ytdl-core'
import Data from './Data'
import Logger from './Logger'

interface Queue {
	userId: Snowflake
	textChannel: TextChannel
	voiceChannel: VoiceChannel
	connection: null
	songs: Array<{
		title: string
		url: string
	}>
	volume: number
	playing: boolean
}

export default class Audio {
	public static queues: Map<string, Queue> = new Map()
	public static player: Player

	public static init() {
		this.player = new Player(Data.client, {
			ytdlOptions: {
				filter: 'audioonly'
			},
			smoothVolume: true
		})

		this.player.on('error', (queue, error) => {
			console.log(
				`[${queue.guild.name}] Error emitted from the queue: ${error.message}`
			)
		})
		this.player.on('connectionError', (queue, error) => {
			console.log(
				`[${queue.guild.name}] Error emitted from the connection: ${error.message}`
			)
		})

		// this.player.on("debug", (idk, mess) => {
		//   console.log(mess);
		// })

		this.player.on('trackStart', (queue, track) => {
			;(queue.metadata as TextChannel).send(
				`🎶 | Started playing: **${track.title}** in **${queue.connection.channel.name}**!`
			)
		})

		this.player.on('trackAdd', (queue, track) => {
			;(queue.metadata as TextChannel).send(
				`🎶 | Track **${track.title}** queued!`
			)
		})

		this.player.on('botDisconnect', queue => {
			;(queue.metadata as TextChannel).send(
				'❌ | I was manually disconnected from the voice channel, clearing queue!'
			)
		})

		this.player.on('channelEmpty', queue => {
			;(queue.metadata as TextChannel).send(
				'❌ | Nobody is in the voice channel, leaving...'
			)
		})

		this.player.on('queueEnd', queue => {
			;(queue.metadata as TextChannel).send('✅ | Queue finished!')
		})
	}
}
