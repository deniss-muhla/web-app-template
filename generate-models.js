const path = require('path');
const fs = require('fs-extra');
const spawn = require('child_process').spawn;
const wget = require('node-wget-promise');

const API_URL = 'https://petstore.swagger.io/v2/swagger.json';
const SPEC_FILE_NAME = 'specification.json';
const API_PATH = 'src/api';
const GEN_PATH = '__generated__';
const ACTION = process.argv[2] || 'download-generate';
const GENERATOR_DOCKER_IMG = 'openapitools/openapi-generator-cli';

const generateModels = () => {
    // Clear gen folder
    console.log(path.join(__dirname, API_PATH, GEN_PATH));

    fs.emptyDirSync(path.join(__dirname, API_PATH, GEN_PATH));
    // Run generation in docker
    const child = spawn('docker', [
        'run',
        '--rm',
        '--net=host',
        '--mount',
        `type=bind,source=${path.join(__dirname, API_PATH)},target=/local`,
        GENERATOR_DOCKER_IMG,
        'generate',
        '-i',
        `/local/${SPEC_FILE_NAME}`,
        '-g',
        'typescript-fetch',
        '-t',
        '/local/gen-template',
        '-o',
        `/local/${GEN_PATH}`
    ]);
    child.stdout.on('data', function(data) {
        console.log('Generate models: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.info('Generate models: ' + data);
    });
    child.on('exit', function() {
        console.log('Generate models script finished');
    });
    child.stdin.end();
};

if (ACTION === 'generate') {
    generateModels();
} else if (ACTION === 'download' || ACTION === 'download-generate') {
    // Download spec
    wget(API_URL, {
        output: path.join(__dirname, API_PATH, SPEC_FILE_NAME)
    })
        .then(() => {
            if (ACTION === 'download-generate') {
                generateModels();
            }
        })
        .catch(err => console.error('Download spec errors: ' + err));
}
