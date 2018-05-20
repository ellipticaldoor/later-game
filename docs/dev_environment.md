# Dev environment

## Terminal emulators
* [https://www.iterm2.com/version3.html](iTerm2 (macos only - version 3))
* [http://cmder.net/](cmder (windows only - download full version))
* [https://gnometerminator.blogspot.co.uk/p/introduction.html](Terminator - (linux only)])
* [https://hyper.is/](Hyper)


## Instal node
[https://nodejs.org/en/download/](Download and install node)


## Install yarn
```
npm install -g yarn
```

## Editor

Install [vscode](https://code.visualstudio.com/)

* Plugins for code editing
    * EditorConfig
    * Bracker Pair Colorizer
    * ESLint
    * Prettier - Code formatter


Settings config
``` json
{
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
    "prettier.eslintIntegration": true,
    "editor.formatOnSave": true,
    "[markdown]": {
        "editor.formatOnSave": false
    },
}
```


## Gitlab ssh config

1. Login / register on [https://gitlab.com/](GitLab)
2. [https://gitlab.com/profile/keys](Add your SSH key)
    * [https://gitlab.com/help/ssh/README#generating-a-new-ssh-key-pair](Docs for generating an ssh key)

Git global setup
``` shell
git config --global push.default simple
git config --global user.name "name"
git config --global user.email "email"
```


## Oh My Zsh - Optional
[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

