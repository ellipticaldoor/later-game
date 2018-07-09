interface IPhysics {
	engine: Matter.Engine
}

type BodyType = 'entity' | 'static'

type BodyLabel = 'player' | 'tile'
