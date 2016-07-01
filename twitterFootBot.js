var Twit = require('twit');
var jsonfile = require('jsonfile');
var parameters = require("./parameters.json");
console.log(parameters.twitter.consumer_key);
var T = new Twit({
  consumer_key:         parameters.twitter.consumer_key,
  consumer_secret:      parameters.twitter.consumer_secret,
  access_token:         parameters.twitter.access_token,
  access_token_secret:  parameters.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})
parameters.twitter.lastID;//cette variable contient l'ID du dernier tweet auquel on a répondu

var request = require('request');// dependance qui va permetttre de crée des requetes facilement


/*
Le tableau Teams contient les différentes équipes qui vont être reconnues par le bot. C'est avec ce tableau que l'on va générer l'expression régulère.
Chaque equipe possède deux versions d'appelation, short et normal, short contient les chaines qui vont être reconnues dans les tweet. normal contient les apppélations des équipes telles qu'elles sont définies dans l'API de football-data
*/
var Teams = {
 short:["PARIS", "MARSEILLE","LILLE","TROYES","AJACCIO","CAEN","NICE","MONACO","NANTES","GUINGAMP","MONTPELLIER","ANGERS","BASTIA","RENNES","BORDEAUX","REIMS","TOULOUSE","SAINT-ETIENNE","LYON","LORIENT"],
 normal:["Paris Saint-Germain","Olympique de Marseille","OSC Lille","ES Troyes AC","Gazélec Ajaccio","SM Caen","OGC Nice","AS Monaco FC","FC Nantes","EA Guingamp","Montpellier Hérault SC","Angers SCO","SC Bastia","Stade Rennais FC","FC Girondins de Bordeaux","Stade de Reims","Toulouse FC","AS Saint-Étienne","Olympique Lyonnais","FC Lorient"]


};

/*
Cette fonction permet de crée l'expression régulière qui va être utlisée pour détecter les équipes dans les tweet.
*/
function regexGenerator(Teams){
  var regexpr="";
  for(var i=0;i<Teams.short.length;i++){
    if(i!=0){
      regexpr = regexpr.concat("|"+Teams.short[i]);
    }
    else{
        regexpr = regexpr.concat(Teams.short[i]);
    }

  }
return new RegExp(regexpr,"igm");
}


/*
Cette fonction permet de récuperer l'ID de la ligue qui est la ligue 1 dans football-data. On récupère à chaque fois cette ID pour eviter qu'en cas de changement d'id pour la ligue 1 par football-data, notre application ne soit plus capable de récuperer les resultats de la ligue 1.
*/
function getLigue(idLigue){

  var options = {
    url: 'http://api.football-data.org/v1/soccerseasons?season=2015',
    headers: {
      'X-Auth-Token': parameters.footballdata.token //on renseigne ce token qui permet de nous authentifier auprès de football-data.
    }
  };

  /*
  Requete qui permet de recupérer la liste des différentes ligue proposé par football-data.
  On recherche alors la ligue 1 et on récupère son id.
  */
  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);

      var i = 0;
      var found = false;
      while(i<info.length && !found){
       if(info[i].caption.indexOf("Ligue 1")!=-1){
         found = true;
         idLigue(info[i].id);

       }
       i++;
       }

    }
    else {
      console.log(error);
    }

  }
request(options, callback);



}


/*
Fonction qui permet de récuperer tous les matchs de la saison de ligue 1.
*/
function getMatchs(idLigue,Matchs){

  var options = {
    url: 'http://api.football-data.org/v1/soccerseasons/'+idLigue+'/fixtures',
    headers: {
      'X-Auth-Token': parameters.footballdata.token
    }
  };
  function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
    Matchs(info.fixtures);

    }
    else {
      console.log(error);
    }

  }
request(options, callback);



}

/*
Fonction qui prend en entrée la liste des matchs de toute la saison de ligue 1 ainsi que les deux équipes pour lesquels la confrontation et demandée.
La fonction retourne un tableau des différentes matchs de la confrontation entre les deux équipes.
*/
function findConfrontation(Matchs,Team1,Team2){
  var Confrontations = [];
for(var i=0;i<Matchs.length;i++){
  if(Matchs[i].homeTeamName == Team1 && Matchs[i].awayTeamName == Team2 ){
    Confrontations.push(Matchs[i]);
  }
  else if(Matchs[i].homeTeamName == Team2 && Matchs[i].awayTeamName == Team1 ){
    Confrontations.push(Matchs[i]);
  }
}
return Confrontations;

}

/*
Fonction qui va permettre de générer la chaine de caractère qui va le tweet.
Elle prend en entrée les confrontations et les mets en forme.
*/
function tweetTextGenerator(confrontations){
  var tweetText = "";
  if(confrontations.length==0){
  tweetText = tweetText.concat("Il n'y a eu encore aucune confrontation cette saison entre ces deux équipes");
  }
  else{
  for(var i=0;i<confrontations.length;i++){
  tweetText = tweetText.concat("Journée "+confrontations[i].matchday+" : "+confrontations[i].homeTeamName+" "+confrontations[i].result.goalsHomeTeam + " - "+confrontations[i].result.goalsAwayTeam +" "+ confrontations[i].awayTeamName+"\n" );
  }
    }
  return tweetText;
}

/*
Fonction qui va etre appelée toute les minutes et qui va répondre aux différentes mentions pour donner le résultat de la confrontation demandée.

*/
function boot(){
  getLigue(function(idLigue){

    getMatchs(idLigue,function(Matchs){

      /*
      On récupère les différentes mentions depuis lastID
      */
T.get('statuses/mentions_timeline',{since_id:parameters.twitter.lastID} ,  function (err, data, response) {
console.log(data);
	if(data !== undefined){
    /*
    On va traiter chaque mention pour essayer d'y répondre
    */
  for(i =0;i<data.length;i++){

    var tweetTeams =  data[i].text.match(regexGenerator(Teams));//on recupère les noms des équipes mentionnées dans le tweet
    var confrontations;
    if(tweetTeams==null){
      var tweetText=("Impossible de trouver les deux équipes dans votre tweet");
    }
      else{

        /*
        Si on a au moins deux équipes on définit les deux premiers éléments du tableau comme les deux équipes.
        */
      if(tweetTeams.length>1){
        var Team1= Teams.normal[Teams.short.indexOf(tweetTeams[0].toUpperCase())];
          var Team2= Teams.normal[Teams.short.indexOf(tweetTeams[1].toUpperCase())];
          confrontations = findConfrontation(Matchs,Team1,Team2);//on récupère les matchs entre les deux équipes
          var tweetText = tweetTextGenerator(confrontations); //on génère le tweet (chaine de caractere) résumant la confrontation
      }
      else{

        var tweetText=("Impossible de trouver une des deux équipes dans votre tweet");
      }
      }




    /*
    On envoi la requette permettant de répondre à l'utilisateur nous ayant mentionné.
    */
    T.post('statuses/update', { status: '@'+data[i].user.screen_name+' '+ tweetText,in_reply_to_status_id:data[i].id_str }, function(err, data2, response) {
		console.log("Tweet envoyé à : "+data2.in_reply_to_screen_name);
		console.log("Tweet : "+data2.text);
		console.log(" ");
	  parameters.twitter.lastID=data2.id_str;//l'id du tweet auquel on a répondu devient le dernier tweet
    })

  }
  jsonfile.writeFile("parameters.json", parameters, {spaces: 2}, function(err) {
    console.error(err)
  });
	}
})
});
});
}
setInterval(boot, 60000);
