const Joi = require("joi");

const schema = Joi.object({
	userId: Joi.string().required(),
	favorites: Joi.array()
		.items(
			Joi.object({
				title: Joi.string(),
				byteSize: Joi.number(),
				link: Joi.string().uri().required(),
			})
		)
		.required(),
});
module.exports = { schema };
