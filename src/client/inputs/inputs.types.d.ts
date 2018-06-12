// Player
type PlayerInputEvent =
	| 'player_up'
	| 'player_left'
	| 'player_down'
	| 'player_right'
type PlayerInputKey = 'w' | 'a' | 's' | 'd'

// Camera
type CameraInputEvent =
	| 'camera_up'
	| 'camera_left'
	| 'camera_down'
	| 'camera_right'
type CameraInputKey = 'i' | 'j' | 'k' | 'l'

// General
type InputKind = 'press' | 'hold' | 'release'
type InputEvent = PlayerInputEvent | CameraInputEvent
type InputKey = PlayerInputKey | CameraInputKey

interface Input {
	[key: string]: {
		readonly key: InputKey
		readonly kind: InputKind
	}
}

interface Inputs {
	events: {
		[key: string]: boolean // TODO: Find a way of using InputEvent as key
	}
}
