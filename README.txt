Synopsis
Ce projet a été réalisé dans le cadre de l'UV LO10. Le but de ce projet est de créer un robot en nodejs qui va intéragir avec twitter ainsi qu'une autre API choisie.
Le robot ici crée est un robot qui va permettre de fournir des informations sur les résultats des matchs de football de Ligue 1 entre deux équipes indiquées par l'utilisateur.


Utilisation du Bot 
Pour demander au bot une confrontation entre deux équipes, il suffit de mentionner le compte twitter utilisé par le bot, ainsi que les noms des deux équipes de la Ligue 1 dont on souhaite connaitre le nom.
Il n'y a pas de syntaxe particulière, il suffit juste que les deux noms soit spécifiés.

Exemple :
@compteTwitter Donne moi les résultats entre paris et marseille

@compteTwitter Paris Nantes

Le bot va répondre à cette requete sous la forme : Journée X : Equipe1 x - x Equipe2 Journée Y : Equipe1 y - y Equipe2

Equipes reconnues (insensible à la casse) : "PARIS", "MARSEILLE","LILLE","TROYES","AJACCIO","CAEN","NICE","MONACO","NANTES","GUINGAMP","MONTPELLIER","ANGERS","BASTIA","RENNES","BORDEAUX","REIMS","TOULOUSE","SAINT-ETIENNE","LYON","LORIENT"


API Reference
Le service REST utilisé pour récuperer les informations sur la Ligue 1 est : football-data.org
C'est un service RESTFull gratuit qui permet de récuperer les informations sur les matchs des équipes européennes.
Nous récuperons tous les matchs d'une ligue à l'aide de la requete : 'http://api.football-data.org/v1/soccerseasons/'+idLigue+'/fixtures'
Il suffit ensuite de récuperer les matchs qui nous interessent.


Node packages
twit : Twitter API client for node --> Utilisé pour communiquer avec l'API REST de twitter
request : Simplified HTTP request client --> Utilisé pour communiquer avec l'API REST de football-data.org

Conditions d'utilisation
Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au Service, que ce soient les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.
Il est seul responsable du bon fonctionnement de son équipement informatique ainsi que de son accès à internet.
Le propriétaire se réserve le droit de refuser l'accès au Service, unilatéralement et sans notification préalable, à tout Utilisateur ne respectant pas les présentes conditions d'utilisation. 
Le propriétaire se réserve la possibilité d'interrompre, de suspendre momentanément ou de modifier sans préavis 
l'accès à tout ou partie du Service, afin d'en assurer la maintenance, ou pour toute autre raison, sans que l'interruption n'ouvre droit à aucune obligation ni indemnisation. 

Le bot ne répondra pas instantanément au tweet mais une fois chaque minute.
Le bot est dépendant des services twitter et football-data et ne peut être responsable de leur dysfonctionnement.


License
Ce bot est sous license MIT.
