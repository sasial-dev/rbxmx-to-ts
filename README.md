<div align="center">

# rbxmx to TS
A powerful CLI to create .d.ts files for .rbxmx files

<a href="https://github.com/sasial-dev/rbxmx-to-ts/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/sasial-dev/rbxmx-to-ts"></a>
<img alt="npm" src="https://img.shields.io/npm/v/rbxmx-to-ts">
</div>

## Getting Started

### Prerequisites

You must have [node](https://nodejs.org/) installed if you are installing through npm.
 It must be **at least** version 16.12.0.

### Installation

#### Node

Use [npm](https://npmjs.com/) to install rbxmx-to-ts.

```bash
npm install rbxmx-to-ts --global
```
<!-- TODO:
#### Foreman
You can add to your foreman.toml
```toml
[tools]
rojo = { source = "sasial-dev/rbxmx-to-ts", version = "2.0.0" }
``` 
-->

#### Binaries
Binaries are avaliable under the release. To download them, go to the release page, and download the version for your operating system.

While support is provided for the binaries, it is suggested to use npm if you are not familiar with using the other installion options.

## Usage

rbxmx-to-ts has been designed to have a very simple usage. If `rbxmxc` is just run, it'll parase all the .rbxmx files from the root folder and all its subdirectories. The full list of options are below:

```
Usage: rbxmxc [options]

Options:
  -v, --version         output the version number
  -w, --watch           watch for file changes
  -f, --file <file...>  path(s) to an rbxmx file - if this is not selected it will select all rbxmx files from the root folder and all its subdirectories
  -e, --export           export the types instead of declaring globally
  -h, --help            display help for command
```

## Contributing
We love contributions! Pull requests are warmly welcomed and highly appriciated. For major changes, please open an issue first or discuss on the discord to let us know what you would like to change.

## Support
Either mention me (Sasial#9375) in the [roblox-ts discord](https://discord.gg/G7sq9rQamM). Or join the discord server I own (the [Lundstrong Discord](https://discord.gg/2w9PmHZPwX)).

## License
This project is lisenced under the Apache 2.0 License.
