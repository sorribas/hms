#!/usr/bin/env node

var tab = require('tabalot');
var os = require('os');
var noop = [];

var ids = function(word, opts, cb) {
	var hms = require('../');
	var c = hms(opts.remote);
	c.list(function(err, list) {
		if (err) return cb(err);
		list = list.map(function(service) {
			return service.id;
		});
		cb(null, list);
	});
};

var help = function() {
	process.stderr.write(require('fs').readFileSync(require('path').join(__dirname, 'help')));
	process.exit(1);
};

tab('*')
	('--remote', '-r', '@host');

tab('list')
	(ids)
	(function(id, opts) {
		require('../commands/list')(id, opts);
	});

tab('add')
	(ids)
	('--start', '-s')
	('--build', '-b')
	('--docks', '-d')
	('--env', '-e')
	(function(id, opts) {
		require('../commands/add')(id, opts);
	});

tab('update')
	(ids)
	('--start', '-s')
	('--build', '-b')
	('--docks', '-d')
	('--env', '-e')
	('--env-add')
	(function(id, opts) {
		require('../commands/update')(id, opts);
	});

tab('remove')
	(ids)
	(function(id, opts) {
		require('../commands/remove')(id, opts);
	});

tab('start')
	(ids)
	(function(id, opts) {
		require('../commands/start')(id, opts);
	});

tab('restart')
	(ids)
	(function(id, opts) {
		require('../commands/restart')(id, opts);
	});

tab('stop')
	(ids)
	(function(id, opts) {
		require('../commands/stop')(id, opts);
	});

tab('ps')
	(ids)
	(function(id, opts) {
		require('../commands/ps')(id, opts);
	});

tab('log')
	(ids)
	(function(id, opts) {
		require('../commands/log')(id, opts);
	});

tab('deploy')
	(ids)
	(function(id, opts) {
		require('../commands/deploy')(id, opts);
	});

tab('dock')
	('--id', '-i', os.hostname())
	('--port', '-p', 10002)
	(function(opts) {
		require('../commands/dock')(opts);
	});

tab('terminal')
	('--port', '-p', 10002)
	('--dock', '-d')
	(function(opts) {
		require('../commands/terminal')(opts);
	});

tab()
	('--version', '-v')
	(function(opts) {
		if (opts.version) return console.log('v'+require('../package.json').version);
		help();
	});

tab.parse() || help();