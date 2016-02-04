'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fileSys = require('fs');
var rmDir = require('rimraf');

module.exports = yeoman.generators.Base.extend({
	constructor: function(){
		yeoman.generators.Base.apply(this, arguments);
        this.log('constructor()...');
	},
	    
    prompting: function(){
        var done = this.async();
        this.prompt({
            type: 'input',
            name: 'name',
            message: 'Name your project',
            default: this.appName
        },
            function(answers){
                this.props = answers
                this.log(answers.name);
                done();
            }.bind(this)); 
    },
    
    writing: {
        config: function(){
            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),{
                    name: this.props.name
                }
            );
        },//end config:
        
        
        app: function(){
            this.log('app()...');
            
			fileSys.mkdir( this.destinationPath('css') );
			this.fs.copy(
                this.templatePath('_project.css'),
                this.destinationPath('css/'+this.props.name+'.css')
            );
			
            this.fs.copyTpl(
                this.templatePath('_index.html'),
                this.destinationPath('index.html'),{
                    name: this.props.name
                }
            );
            
            
            this.fs.copyTpl(
                this.templatePath('_project.js'),
                this.destinationPath(this.props.name+'.js'),{
                    name: this.props.name
                }
            );
            
        }//end app:
    },//end writing:
                                        
    install: function(){
        this.installDependencies();
    },
    
    
    end: function(){
		this.log('end()...');
        
        fileSys.mkdir( this.destinationPath('lib') );
        this.fs.copy(
                this.destinationPath('bower_components/bootstrap/dist'),
                this.destinationPath('lib/bootstrap')
        );
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/css/bootstrap-theme.css'));
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/css/bootstrap-theme.css.map'));
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/css/bootstrap.css'));
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/css/bootstrap.css.map'));
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/js/bootstrap.js'));
        fileSys.unlink(this.destinationPath('bower_components/bootstrap/dist/js/npm.js'));
        
        
        
        fileSys.mkdir( this.destinationPath('lib/angular') );
        this.fs.copy(
                this.destinationPath('bower_components/angular/angular.min.js'),
                this.destinationPath('lib/angular/angular.min.js')
        );
         this.fs.copy(
                this.destinationPath('bower_components/angular/angular-csp.css'),
                this.destinationPath('lib/angular/angular-csp.css')
        );       
        fileSys.mkdir( this.destinationPath('lib/jquery') );
        this.fs.copy(
                this.destinationPath('bower_components/jquery/dist/jquery.min.js'),
                this.destinationPath('lib/jquery/jquery.min.js')
        );
        
        rmDir( this.destinationPath('bower_components'),function(error){} );
        fileSys.unlink(this.destinationPath('bower.json'));
    }
    

});
