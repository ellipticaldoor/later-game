interface IPhysics {
	engine: Matter.Engine
	render: Matter.Render
}

type BodyType = 'entity' | 'static'
