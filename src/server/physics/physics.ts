import { Engine } from 'matter-js'

const physicsEngine = Engine.create()

setInterval(() => {
	Engine.update(physicsEngine, 1000 / 60)
}, 1000 / 60)
