#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const shell = require('shelljs');

program
  .version('1.0.2') 
  .option('-p, --path [type]', 'Virtual path to add terbium page.')
  .option('-n, --name [type]', 'Name of the file to create.')
  .option('-e, --extend [type]', 'Extend the terbium class out.')
  .option('-x, --experience [type]', 'Space delimited experiences pe te we etc.')
  .parse(process.argv);
  
/*
console.log('path', program.path);
console.log('name', program.name);
console.log('extend', program.extend);
console.log('current path->', process.cwd());
console.log('experience->', program.experience);
*/

if(program.path != undefined && program.name != undefined){
	CreateStructure();
}

function CreateStructure(){ 
	shell.mkdir('-p', program.path);
	if(program.experience == undefined){
		shell.mkdir('-p', program.path + '/pe');
		shell.mkdir('-p', program.path + '/te');
		shell.mkdir('-p', program.path + '/we');
	}
	else{ 
		let exps = program.experience.split(' ');
		for(var i = 0; i < exps.length; i++){
			let item = exps[i].trim();
			shell.mkdir('-p', program.path + '/' + item);
		} 
	}
	WriteFiles();
	console.log('Terbium Page has finished creating files...');
};

function WriteFiles(){
	var exps = [];
	if(program.experience == undefined){
		exps.push('pe');
		exps.push('te');
		exps.push('we');
	}
	else{
		exps = program.experience.split(' ');
	}
	 
	for(var i = 0; i < exps.length; i++){
		let item = exps[i].trim();
		fs.writeFile(program.path + '/' + item + '/' + program.name + '.css', CSSContent(program.name), function(err) { 
			if(err){
				console.log('Error creating style->', err);
			}
		}); 	

		fs.writeFile(program.path + '/' + item + '/' + program.name + '.js', JSContent(program.name, program.extend), function(err) { 
			if(err){
				console.log('Error creating class->', err);
			}
		}); 	

		fs.writeFile(program.path + '/' + item + '/' + program.name + '.html', HTMLContent(program.name), function(err) { 
			if(err){
				console.log('Error creating html->', err);
			}
		}); 	 
	}
};

function ReplaceString(str, find, replace) {
	function escapeRegExp(str) {
		if (str) {
			return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
		}
		else {
			return '';
		}
	};

	if (typeof str != 'string') {
		return str;
	}
	else {
		return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
};

function CSSContent(name){
	return '.' + name + ' { }';
}

function HTMLContent(name){
	return '<div>' + name + '</div>';
}

function JSContent(name, extend){
	var jsString = '';
	if(extend){
		jsString += 'class TerbiumScript extends ' + extend + ' { \n';
	}
	else{
		jsString += 'class TerbiumScript { \n';
	}
    jsString += '\tconstructor(id) { \n';
	if(extend){
		jsString += '\t\super(); \n';
	}
    jsString += '\t\tthis.id = id; \n';
    jsString += '\t\tthis.page = null; \n';
    jsString += '\t} \n';
	jsString += ' \n';
    jsString += '\trender(params) { \n';
    jsString += '\t} \n';
	jsString += ' \n';
    jsString += '\tdispose() { \n';
    jsString += '\t}  \n';
	jsString += '} \n';
	return jsString;
}



	