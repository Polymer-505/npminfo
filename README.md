# npminfo

CLI tool for looking up npm package info and searching the registry

## Features

- You can see data of package.
- Displays the Name, Description, Version, Author, License, Weekly and Monthly downloads, Homepage, Bugs and Keywords.
- No configuration required: just one argument, and you get the result.
- Works as a regular command or via npx, with no installation needed.

## Install

- Via npm

```bash
npm install -g @polymer505/npminfo
```

- Via npx

```bash
# For list data
npx @polymer505/npminfo data <package name>

# For search
npx @polymer505/npminfo search <package name> <size>
```

## Usage

Run `npminfo` by specifying package name

```bash
# For list data
npminfo data <package name>

# For search
npminfo search <package name> <size>
```

### Example

```bash
npminfo data react

npminfo search chalk 6
```

## Preview

### List data

```bash
npminfo data @polymer505/mss
```

```
Name               @polymer505/mss
Description        Command-line tool for checking Minecraft servers.
Version            1.1.0
Author             Polymer-505
License            MIT
Weekly downloads   123
Monthly downloads  123
Homepage           https://github.com/Polymer-505/mss#readme
Bugs               https://github.com/Polymer-505/mss/issues
Keywords           minecraft, minecraft-server, cli, status, ping
```

### Search

```bash
npminfo search commander 3
```

```
Name               commander
Description        the complete solution for node.js command-line programs
Version            15.0.0
Author             abetomo
License            MIT
Weekly downloads   625481745
Monthly downloads  2136358602
Homepage           https://github.com/tj/commander.js#readme
Bugs               https://github.com/tj/commander.js/issues

Name               @commander-js/extra-typings
Description        Infer strong typings for commander options and action handlers
Version            15.0.0
Author             shadowspawn
License            MIT
Weekly downloads   5841568
Monthly downloads  19644384
Homepage           https://github.com/commander-js/extra-typings#readme
Bugs               https://github.com/commander-js/extra-typings/issues

Name               @fig/complete-commander
Description        Export commander command as a Fig spec
Version            3.2.0
Author             grant0417
License            MIT
Weekly downloads   625582
Monthly downloads  2374671
Homepage           https://github.com/withfig/autocomplete-tools#readme
Bugs               https://github.com/withfig/autocomplete-tools/issues
```

## Building from Source

If you want to compile `npminfo` into a standalone executable file, use `@yao-pkg/pkg`:

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build executables:**

- For linux (npminfo-linux)

```bash
   npm run build
```

- For linux arm64 (npminfo-linux-arm64)

```bash
   npm run build-arm64
```

- For Windows (npminfo-win.exe)

```bash
   npm run build:win
```

- For Windows arm64 (npminfo-win-arm64.exe)

```bash
   npm run build:win-arm64
```

## License

This project is licensed under the [MIT License](LICENSE).
