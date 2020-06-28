const { knex } = require("./knex")

module.exports.InitializeDatabase = () =>{
    knex.schema.hasTable('Actors').then((exists)=>{
        if(!exists){
        return knex.schema.createTable('Actors', (t) =>{
            t.integer("id").primary();
            t.string("login");
            t.string("avatar_url");
            t.dateTime("update_at");
            t.integer("event_count").defaultTo(0);

        } )
    }
    })

    knex.schema.hasTable('Repos').then((exists)=>{
        if(!exists){
        return knex.schema.createTable('Repos', (t) =>{
            t.integer("id").primary();
            t.string("name");
            t.string("url")
        } )
    }
    })

    knex.schema.hasTable('Events').then((exists)=>{
        if(!exists){
        return knex.schema.createTable('Events', (t) =>{
            t.integer("id").primary();
            t.string("type");
            t.integer("actorId");
            t.integer("repoId");
            t.foreign("actorId").references('Actors.id')
            t.foreign("repoId").references('Repos.id')
            t.datetime("created_at")
        } )
    }
    })
   

}

