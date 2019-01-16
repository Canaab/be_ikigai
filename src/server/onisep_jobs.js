const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const jobs = require('./seeds/jobs.json');
const Promise = require('bluebird');

let cpt = 0;
let cpte = 0;

Promise.resolve(Object.values(jobs))
	.mapSeries(request)
	.then(writeJSON)

function request(job, index, length) {
	job.id = index;
	return axios
		.get(job.lien_site_onisepfr)
		.then(res => {
			const { data } = res;
			const $ = cheerio.load(data);
			const text = [];

			$('#en-quoi-consiste-ce-metier').children().children('.ezxmltext-field').children('p').each(function () {
				text.push($(this).text());
			})

			job.description = text.join('\n');
			cpt++;

			return job;
		})
		.catch(() => {
			job.description = '';
			cpte++;

			return job;
		})
		.finally(() => {
			console.clear();
			console.log(`Crawled ${cpt} / ${length} | ${cpte} errors.`);
		})
}

function writeJSON(jobs) {
	const data = JSON.stringify(jobs, null, '\t');

	fs.writeFile('./seeds/jobs.json', data, function (err) {
		if(err) throw err;
		console.log("Done.");
	})
}