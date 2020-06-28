const { knex } = require("../knex");

var getAllActors = async (req,res,next) => {
	try {
		var actors  = await knex("Actors").select("id","login","avatar_url").
		orderBy("event_count","desc").
		orderBy("update_at","desc")
		.orderBy("login","asc");
		res.send(actors);
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}

};

var updateActor = async (req,res,next) => {
	var actor  = await knex("Actors").where("id",req.body.id);
	if(actor.length > 0){
		if(req.body.login === actor[0].login){
			await knex("Actors").where("id",req.body.id).
			update("avatar_url",req.body.avatar_url)
			res.send()
		}else{
			res.status(400).send();
		}
	}else{
		res.status(404).send();
	}
};

var getStreak = () => {

};


module.exports = {
	updateActor: updateActor,
	getAllActors: getAllActors,
	getStreak: getStreak
};

















