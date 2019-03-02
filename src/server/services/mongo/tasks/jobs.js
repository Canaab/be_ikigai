module.exports = {
	actions: {

		"#tasks/get-jobs": {
			params: {
				ids: "array"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => {
						return client.db('ikigai')
							.collection('jobs')
							.find({id: {'$in': ctx.params.ids.map(elt => elt.id)}})
							.toArray()
							.then(result => ctx.params.ids.map(elt => {
								const job = result.find(job => job.id === elt.id);
								return {
									name: job.libelle_metier,
									description: job.description,
									onisep: job.lien_site_onisepfr,
									accuracy: elt.accuracy,
								}
							}))
					})
			}
		}
	}
}