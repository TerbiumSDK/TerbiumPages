#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const shell = require('shelljs');

program
  .version('14.0.0') 
  .option('-p, --path [type]', 'Virtual path to add terbium experience.')
  .option('-n, --name [type]', 'Name of the experience page.')
  .option('-e, --extend [type]', 'Extend the TerbiumBlock class.')
  .option('-x, --experience [type]', 'Space delimited experiences to include pe te we etc.')
  .parse(process.argv);
   
if(program.path != undefined && program.name != undefined){
	CreateStructure();
}

function CreateStructure(){ 
	shell.mkdir('-p', program.path);
	if(program.experience == undefined){
		shell.mkdir('-p', program.path + '/pe');
		shell.mkdir('-p', program.path + '/te');
		shell.mkdir('-p', program.path + '/we');

		shell.mkdir('-p', program.path + '/pe/css');
		shell.mkdir('-p', program.path + '/te/css');
        shell.mkdir('-p', program.path + '/we/css');

		shell.mkdir('-p', program.path + '/pe/js');
		shell.mkdir('-p', program.path + '/te/js');
		shell.mkdir('-p', program.path + '/we/js');
    }
	else{ 
		let exps = program.experience.split(' ');
		for(var i = 0; i < exps.length; i++){
			let item = exps[i].trim();
			shell.mkdir('-p', program.path + '/' + item);
		} 
	}
	WriteFiles();
	console.log('TerbiumSDK has finished creating files...');
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
		fs.writeFile(program.path + '/' + item + '/css/' + program.name + '.css', CSSContent(program.name), function(err) { 
			if(err){
				console.log('Error creating style->', err);
			}
		}); 	

		fs.writeFile(program.path + '/' + item + '/js/' + program.name + '.js', JSContent(program.name, program.extend), function(err) { 
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
	return '.page-css { }';
}

function HTMLContent(name){
	return '<tb-section>\n\\t' + name + '\n</tb-section>';
}

function JSContent(name, extend) {
    var jsString = '';
    if (extend) {
        jsString += 'class TerbiumBlock extends ' + extend + ' { \n';
    }
    else {
        jsString += 'class TerbiumBlock { \n';
    }
    jsString += '\tconstructor() { \n';
    if (extend) {
        jsString += '\t\super(); \n';
    }
    jsString += '\t} \n';
    jsString += ' \n';
    jsString += '\trender(params) { \n';

    jsString += '\t\treturn new Promise((resolve, reject) => {\n';
    jsString += '\t\t\tresolve();\n';
    jsString += '\t\t});\n';

    jsString += '\t} \n';
    jsString += ' \n';
    jsString += '\tdispose() { \n';
    jsString += '\t}  \n';
    jsString += '} \n';
    return jsString;
}



	