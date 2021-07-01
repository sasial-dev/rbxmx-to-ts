<div align="center">

# rbxmx to TS
A powerful CLI to create .d.ts files for .rbxmx files

<a href="https://github.com/sasial-dev/rbxmx-to-ts/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/sasial-dev/rbxmx-to-ts"></a>
<img alt="npm" src="https://img.shields.io/npm/v/@rbxts/rbxmx-to-ts">
<img alt="David" src="https://img.shields.io/david/sasial-dev/rbxmx-to-ts">
<img alt="David" src="https://img.shields.io/david/dev/sasial-dev/rbxmx-to-ts">
</div>

## Getting Started

### Prerequisites

You must have [node](https://nodejs.org/) installed if you are installing through npm. It must be **at least** version 12.

### Reccomended Installation

Use [npm](https://npmjs.com/) to install rbxmx-to-ts.

```bash
npm install @rbxts/rbxmx-to-ts --global
```

### Other Installation
Binaries are avaliable. To download them, go to the release page, and download the version for your operating system. You can then use it as a command line argument (Example: `./rbxmxc --help`)

Or add it to your path in [windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/), [mac and linux](https://opensource.com/article/17/6/set-path-linux). With more information provided [here](https://wpbeaches.com/how-to-add-to-the-shell-path-in-macos-using-terminal/) for mac users.
It is suggested to use node, but if you have added edit-roblox-place to your path, it will work like the node version.

## Usage

rbxmx-to-ts has been designed to have a very simple usage. If `rbxmxc` is just run, it'll parase all the .rbxmx files from the root folder and all its subdirectories. There is also the `-w` flag to watch, and the `-f` flag to select specific files. 

```
Usage: rbxmxc [options]

Options:
  -v, --version         output the version number
  -w, --watch           watch for file changes
  -f, --file <file...>  path(s) to an rbxmx file - if this is not selected it will select all rbxmx files from the root folder and all its subdirectories
  -h, --help            display help for command
```

## Contributing
We love contributions! Pull requests are warmly welcomed and highly appriciated. For major changes, please open an issue first or discuss on the discord to let us know what you would like to change.

## Support
Either mention me (Sasial#9375) in the [roblox-ts discord](https://discord.gg/G7sq9rQamM). Or join the discord server I own (the [Lundstrong Discord](https://discord.gg/2w9PmHZPwX)).

## License
Coming soon.
