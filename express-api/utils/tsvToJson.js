'use strict';

const fs = require( 'fs' );

/**
 * Finds .tsv files that are newer than the associated .json files,
 * or which have no associated .json file.
 *
 * @param {string} dataPath path to the directory containing tsv/json files
 * @return {Object[]} an array of objects, each with two fields:
 * 						tsvFile: the "new" tsv file name (without path)
 *						jsonFile: what the associated json file name should be
 */
function getNewTsvFilesSync( dataPath ) {
	if ( !fs.existsSync( dataPath ) ) {
		throw new Error( `static data path ${dataPath} does not exist` );
	}

	const tsvFiles = fs.readdirSync( dataPath ).filter( c => c.split( '.' ).pop() == 'tsv' );
	var newTsvFiles = [];
	tsvFiles.forEach( tsvFile => {
		const jsonFile = tsvFile.split( '.' ).shift() + '.json';
		if ( checkForNewTsv( dataPath, tsvFile, jsonFile ) ) {
			newTsvFiles.push( { tsvFile, jsonFile } );
		}
	}); 
	return newTsvFiles;
}

/**
 * Determines if the input path and file represents a "new" .tsv file
 *
 * @param {string} dataPath path to the directory containing tsv/json files
 * @param {string} tsvFile tsv file name (without path)
 * @return {boolean} true if this is a "new" .tsv file, false otherwise
 */
function checkForNewTsv( dataPath, tsvFile, jsonFile ) {
	const tsvPathAndFile = dataPath + '/' + tsvFile;
	const jsonPathAndFile = dataPath + '/' + jsonFile;

	return !fs.existsSync( jsonPathAndFile ) || isFileNewer( tsvPathAndFile, jsonPathAndFile );
}

/**
 * Determines if "file one" is newer than "file two".
 *
 * @param {string} pathAndFileOne file one
 * @param {string} pathAndFileTwo file two
 * @return {boolean} true if file one is newer than file two, false otherwise.
 */
function isFileNewer( pathAndFileOne, pathAndFileTwo ) {
    return fs.statSync( pathAndFileOne ).mtimeMs > fs.statSync( pathAndFileTwo ).mtimeMs;
}

/**
 * Creates/overwrites a json file based on the contents of its associated tsv file
 *
 * @param {string} dataPath path to the directory containing tsv/json files
 * @param {string} tsvFile tsv file name (without path)
 * @param {string} jsonFile json file name (without path)
 */
function tsvFileToJsonFileSync( dataPath, tsvFile, jsonFile ) {
	const tsvPathAndFile = dataPath + '/' + tsvFile;
	const jsonPathAndFile = dataPath + '/' + jsonFile;

    const tsv = fs.readFileSync( tsvPathAndFile, 'utf8' );
	const json = tsvToJson( tsv );
	try {
		var fd = fs.openSync( jsonPathAndFile, 'w+' );
		fs.writeSync( fd, JSON.stringify( json ) );
		fs.closeSync( fd );
	} catch ( err ) {
		console.log( `Unable to open ${jsonPathAndFile} for writing: ${err.code} (${err.errno})` );
	}
}

/**
 * Converts a string in tsv format to an equivalent json object
 *
 * @param {string} tsv a string in tsv format, likely from a tsv file.
 * @return {Object} an equivalent json object
 */
function tsvToJson( tsv ) {
	const lines = tsv.split( '\n' );
	const headers = lines.shift().split( '\t' );
	return lines.map( line => {
		const data = line.split( '\t' );
		return headers.reduce( ( obj, nextKey, index ) => {
			obj[ nextKey ] = data[ index ];
			return obj;
		}, {} );
	} );
}

module.exports = {
	getNewTsvFilesSync,
	tsvFileToJsonFileSync
};