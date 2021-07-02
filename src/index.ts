#!/usr/bin/env node

import { parseString } from "xml2js";
import { program } from "commander";
import { watch } from "chokidar";
import fs from "fs";
import { sync } from 'glob'
import path from "path"
import chalk from "chalk";

const glob = sync

const invalidTSBlacklist = new Set([
	"do",
	"if",
	"in",
	"for",
	"let",
	"new",
	"try",
	"var",
	"case",
	"else",
	"enum",
	"eval",
	"false",
	"null",
	"this",
	"true",
	"void",
	"with",
	"break",
	"catch",
	"class",
	"const",
	"super",
	"throw",
	"while",
	"yield",
	"delete",
	"export",
	"import",
	"public",
	"return",
	"static",
	"switch",
	"typeof",
	"default",
	"extends",
	"finally",
	"package",
	"private",
	"continue",
	"debugger",
	"function",
	"arguments",
	"interface",
	"protected",
	"implements",
	"instanceof",
]);

function validTSIdentifier(str: string) {
	return !invalidTSBlacklist.has(str) && str.match("^[%a_$][%w_$]*$") !== null ? str : `["${str}"]`;
}

function getClass(item: any) { // TODO: Can't really define as anything else - suggestions needed
	return item['$'].class
}

function getName(item: any) { // TODO: Can't really define as anything else - suggestions needed
	for (let i = 0; i < item.Properties[0].string.length; i++) {
		if (item.Properties[0].string[i]["$"].name == "Name") {
			return item.Properties[0].string[i]["_"]
		}
	}
}

function generateSubInterface(results: string[], item: any, depth: number) {
	results.push(`${"\t".repeat(depth - 1)}${validTSIdentifier(getName(item))}: ${getClass(item)}`);
	if (item.Item) {
		results.push(` & {\n`);

		for (let i = 0; i < item.Item.length; i++) {
			generateSubInterface(results, item.Item[i], depth + 1);
		}

		results.push("\t".repeat(depth - 1));
		results.push("}");
	}
	results.push(";\n");
}

function generateInterface(item: any) {
	const results: string[] = [`type ${getName(item)} = ${getClass(item)} &`, " {\n"];
	for (let i = 0; i < item.Item.length; i++) generateSubInterface(results, item.Item[i], 2)
	results.push("}\n");
	return results.join("")
}

function parseFile(file: string) {
	console.log(`\n[${chalk.grey(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, second: 'numeric' }))}] ${chalk.yellowBright("Parsing")} ${file}`)
	const xml = fs.readFileSync(file, { encoding: "utf-8" })
	parseString(xml, {
		
	}, function (err, result) {
		// fs.writeFileSync("output.json", JSON.stringify(result, null, 4), { encoding: "utf-8" })
		fs.writeFileSync((file.substring(0, file.length - 6) + ".d.ts"), generateInterface(result.roblox.Item[0]), { encoding: "utf-8" })
		console.log(`\n[${chalk.grey(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, second: 'numeric' }))}] ${chalk.greenBright("Parsed")} ${file}`)
	});
}

program.version(require("../package.json").version, '-v, --version')

program
	.option('-w, --watch', 'watch for file changes')
	.option('-f, --file <file...>', 'path(s) to an rbxmx file - if this is not selected it will select all rbxmx files from the root folder and all its subdirectories');

program.parse(process.argv);

const options = program.opts();

let files: string[] = []

if (options.file === undefined) {
	files = glob(process.cwd() + "/**/*.rbxmx")
} else {
	for (let i = 0; i < options.file.length; i++) {
		if (options.file[i].indexOf(".rbxmx") >= 0) {
			files.push(path.resolve(options.file[i]))
		}
	}
}
if (files[0] == undefined && options.file !== undefined) {
	console.log(chalk.redBright(`There are no rbxmx files. Make sure to add ${chalk.white.inverse(".rbxmx")} to the end of the -f files. Example: ${chalk.white.inverse("rbxmx -f mainGui.rbxmx")}`))
}
if (files[0] == undefined && options.file === undefined) {
	console.log(chalk.redBright(`There are no rbxmx files. Make sure to add .rbxmx files to this folder or its subdirectories.`))
}

if (options.watch && options.file === undefined) {
	const watcher = watch(process.cwd() + "/**/*.rbxmx")
	watcher
		.on('add', parseFile)
		.on('change', parseFile)
		.on('unlink', file => {
			if (fs.existsSync(file.substring(0, file.length - 6) + ".d.ts")) {
				fs.unlinkSync(file.substring(0, file.length - 6) + ".d.ts")
				console.log(`\n[${chalk.grey(new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, second: 'numeric' }))}] ${chalk.redBright("Deleted")} ${file.substring(0, file.length - 6) + chalk.bold(".d.ts")}`)
			}
		})
} else if (options.watch && options.file) {
	const watcher = watch(options.file)
	watcher
		.on('add', parseFile)
		.on('change', parseFile)
		.on('unlink', file => {
			if (fs.existsSync(file.substring(0, file.length - 6) + ".d.ts")) {
				fs.unlinkSync(file.substring(0, file.length - 6) + ".d.ts")
			}
		})
} else {
	for (let i = 0; i < files.length; i++) parseFile(files[i])
}
