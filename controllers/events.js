const { knex } = require("../knex");

var getAllEvents = async (req,res,next) => {
	var EventRows = await knex("Events").orderBy("id","asc");
	var ActorRows = await knex("Actors").select("id","login","avatar_url");
	var repoReows = await knex("Repos");
	var results = [];
	EventRows.forEach(row => {
		var actor = ActorRows.find((x) => x.id === row.actorId);
		var repo = repoReows.find((x) => x.id === row.repoId);
		let {actorId,repoId,...rest} = row;
		results.push({...rest,"actor" : actor,"repo" : repo});
	});
	res.setHeader('Content-Type', 'application/json');
	res.send(results);
};

var addEvent = async (req,res,next) => {
	try{
	var eventEntry = {
		id : req.body.id, 
		type : req.body.type,
		actorId : req.body.actor.id,
		repoId: req.body.repo.id,
		created_at: req.body.created_at
	}

	var repoEntry = {
		id : req.body.repo.id,
		name: req.body.repo.name,
		url : req.body.repo.url,
	}

	var ActorEntry = {
		id : req.body.actor.id,
		login: req.body.actor.login,
		avatar_url : req.body.actor.avatar_url
	}
	var repoRow =  await knex("Repos").where("id" , req.body.repo.id);
	if(repoRow.length === 0){
		await knex("Repos").insert(repoEntry);
	}

	var actorRow =  await knex("Actors").where("id" , req.body.actor.id);
	var acterrowcount;
	if(actorRow.length === 0){
		await knex("Actors").insert(ActorEntry);
		acterrowcount  = 0;
	}else{
		acterrowcount  = actorRow[0].event_count;
	}

	var eventRow =  await knex("Events").where( "id", req.body.id);
	if(eventRow.length > 0){
		res.status(400).send();
	}else{
		await knex("Events").insert(eventEntry);
		await knex("Actors").
			where("id",req.body.actor.id).
			update({update_at : req.body.created_at, 
				event_count : acterrowcount + 1});
		res.status(201).send();
	}
	} catch(ex){
		console.log(ex.message);
		res.status(500).send();
	}

};


var getByActor = async(req,res,next) => {
	try {
		const actorId = req.params.id;
		var ActorRows = await knex("Actors").select("id","login","avatar_url").
						where("id",actorId);
		if(ActorRows.length == 0){
			res.status(404).send();
		}else{
	
		var EventRows = await knex("Events").where("actorId",actorId).orderBy("id","asc");
		var repoReows = await knex("Repos");
		var results = [];
		EventRows.forEach(row => {
			var actor = ActorRows.find((x) => x.id === row.actorId);
			var repo = repoReows.find((x) => x.id === row.repoId);
			let {actorId,repoId,...rest} = row;
			results.push({...rest,"actor" : actor,"repo" : repo});
		});
		res.send(results);
	}
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}

};


var eraseEvents = async (req,res,next) => {
	try {
		await knex("Events").delete();
	    res.send();
	} catch (error) {
		console.log(error.message);
		res.status(500).send();
	}
	
};

module.exports = {
	getAllEvents: getAllEvents,
	addEvent: addEvent,
	getByActor: getByActor,
	eraseEvents: eraseEvents
};

















