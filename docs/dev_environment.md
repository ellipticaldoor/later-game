# Dev environment

## Terminal emulators
* [iTerm2 (macos only - version 3)](https://www.iterm2.com/version3.html)
* [cmder (windows only - download full version)](http://cmder.net/)
* [Terminator - (linux only)](https://gnometerminator.blogspot.co.uk/p/introduction.html)
* [Hyper](https://hyper.is/)


## Instal node
[Download and install node](https://nodejs.org/en/download/)


## Install yarn
```
npm install -g yarn
```

## Editor

Install [https://code.visualstudio.com/](vscode)

* Plugins for code editing
	* Bracker Pair Colorizer
	* ESLint
	* TSLint
	* Jest
	* editorconfig


Settings config
``` json
{
	"editor.insertSpaces": false,
	"editor.tabSize": 4,
	"editor.detectIndentation": false,
	"telemetry.enableTelemetry": false,
	"files.autoSave": "onFocusChange",
	"editor.multiCursorModifier": "ctrlCmd",
	"editor.wordWrap": "on",
	"files.insertFinalNewline": true,
	"workbench.tips.enabled": false,
	"workbench.activityBar.visible": false,
	"editor.lightbulb.enabled": false,
	"javascript.suggestionActions.enabled": false,
	"files.trimTrailingWhitespace": true,
	"editor.formatOnPaste": true,
	"window.title": "${activeEditorMedium}${separator}${rootName}"
}
```


## Gitlab ssh config

1. Login / register on [GitLab](https://gitlab.com/)
2. [Add your SSH key](https://gitlab.com/profile/keys)
	* [Docs for generating an ssh key](https://gitlab.com/help/ssh/README#generating-a-new-ssh-key-pair)

Git global setup
``` shell
git config --global push.default simple
git config --global user.name "name"
git config --global user.email "email"
```


## Oh My Zsh - Optional
[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

