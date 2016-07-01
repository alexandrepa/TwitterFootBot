Synopsis
Ce projet a �t� r�alis� dans le cadre de l'UV LO10. Le but de ce projet est de cr�er un robot en nodejs qui va int�ragir avec twitter ainsi qu'une autre API choisie.
Le robot ici cr�e est un robot qui va permettre de fournir des informations sur les r�sultats des matchs de football de Ligue 1 entre deux �quipes indiqu�es par l'utilisateur.


Utilisation du Bot
Pour demander au bot une confrontation entre deux �quipes, il suffit de mentionner le compte twitter utilis� par le bot, ainsi que les noms des deux �quipes de la Ligue 1 dont on souhaite connaitre le nom.
Il n'y a pas de syntaxe particuli�re, il suffit juste que les deux noms soit sp�cifi�s.

Exemple :
@compteTwitter Donne moi les r�sultats entre paris et marseille

@compteTwitter Paris Nantes

Le bot va r�pondre � cette requete sous la forme : Journ�e X : Equipe1 x - x Equipe2 Journ�e Y : Equipe1 y - y Equipe2

Equipes reconnues (insensible � la casse) : "PARIS", "MARSEILLE","LILLE","TROYES","AJACCIO","CAEN","NICE","MONACO","NANTES","GUINGAMP","MONTPELLIER","ANGERS","BASTIA","RENNES","BORDEAUX","REIMS","TOULOUSE","SAINT-ETIENNE","LYON","LORIENT"


API Reference
Le service REST utilis� pour r�cuperer les informations sur la Ligue 1 est : football-data.org
C'est un service RESTFull gratuit qui permet de r�cuperer les informations sur les matchs des �quipes europ�ennes.
Nous r�cuperons tous les matchs d'une ligue � l'aide de la requete : 'http://api.football-data.org/v1/soccerseasons/'+idLigue+'/fixtures'
Il suffit ensuite de r�cuperer les matchs qui nous interessent.


Node packages
twit : Twitter API client for node --> Utilis� pour communiquer avec l'API REST de twitter
request : Simplified HTTP request client --> Utilis� pour communiquer avec l'API REST de football-data.org

Conditions d'utilisation
Le Service est accessible gratuitement � tout Utilisateur disposant d'un acc�s � internet. Tous les co�ts aff�rents � l'acc�s au Service, que ce soient les frais mat�riels, logiciels ou d'acc�s � internet sont exclusivement � la charge de l'utilisateur.
Il est seul responsable du bon fonctionnement de son �quipement informatique ainsi que de son acc�s � internet.
Le propri�taire se r�serve le droit de refuser l'acc�s au Service, unilat�ralement et sans notification pr�alable, � tout Utilisateur ne respectant pas les pr�sentes conditions d'utilisation.
Le propri�taire se r�serve la possibilit� d'interrompre, de suspendre momentan�ment ou de modifier sans pr�avis
l'acc�s � tout ou partie du Service, afin d'en assurer la maintenance, ou pour toute autre raison, sans que l'interruption n'ouvre droit � aucune obligation ni indemnisation.

Le bot ne r�pondra pas instantan�ment au tweet mais une fois chaque minute.
Le bot est d�pendant des services twitter et football-data et ne peut �tre responsable de leur dysfonctionnement.


License
Ce bot est sous license MIT.
