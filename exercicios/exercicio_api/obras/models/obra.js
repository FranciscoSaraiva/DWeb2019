var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ObraSchema = new Schema({
    _id: { type: String, required: true },
    nome: { type: String, required: true },
    desc: { type: String, required: true },
    anoCriacao: { type: Number, required: true },
    periodo: { type: String, required: true },
    compositor: { type: String, required: true },
    duracao: { type: String, required: true }
})


/**
 * 			{
				"nome": "Rage Over a Lost Penny",
				"desc": "The \"Rondo alla ingharese quasi un capriccio\" in G major, Op. 129 (Italian: \"Rondo in the Hungarian [i.e. gypsy] style, almost a\n         caprice\"), is a piano rondo by Ludwig van Beethoven. It is better known by the title Rage Over a Lost Penny, Vented in a Caprice (from\n         German: Die Wut über den verlorenen Groschen, ausgetobt in einer Caprice). This title appears on the autograph manuscript, but not in\n         Beethoven's hand, and has been attributed to his friend Anton Schindler. It is a favourite with audiences and is frequently performed as a\n         show piece.",
				"anoCriacao": "1745",
				"periodo": "Barroco",
				"compositor": "Krebs, Johann Ludwig",
				"duracao": "01:00:26",
				"_id": "O2"
			},
 */

module.exports = mongoose.model('obras', ObraSchema);