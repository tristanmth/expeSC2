library(jsonlite)
library(ggpubr)
library(rstatix)

#choisir un autre fichier pour les tests
dat1 <- fromJSON("https://rafael.laboissiere.net/m1-miashs-2024-s8/Cho0gooz/data/2024-04-29-18-00-18.json")

testX = unlist(dat1$mesureX)
testY = unlist(dat1$mesureY)

df <- data.frame(subject=numeric(),trial=character(),response=character(),congruence=numeric(),prop_congr = numeric(),IT=numeric(),RT=numeric(),error = numeric())
X = c()
Y = c()

#il faudra faire une boucle pour chaque bloc

compte = 0
len = length(testX)
for(k in 1:len){
  if(identical(testX[k],'{') || identical(testX[k],'}')){
  }
  else{
  start = strsplit(testX[k],':')
  cong_prop_rep = strsplit(testX[k],' ')
  print(cong_prop_rep)
  if(isTRUE(match("start",start[[1]][1]) == 1)){
    if(compte >= 1){
      dfi <- data.frame(subject,trial,response,congruence,prop_congr ,IT,RT,error)
      df = rbind(df,dfi)
    }
    compte = compte +1 
    subject = start[[1]][2] #on met le n du sujet 
    trial = compte #le nombre d'essai au total
  }else if(isTRUE(match("congruence",cong_prop_rep[[1]][1]) == 1)){
    if(isTRUE(match("{true}",cong_prop_rep[[1]][2])== 1)){
      congruence = 1 #congruent
    }else {
      congruence = 2 #incongruent
    }
  }else if(isTRUE(match("proportion",cong_prop_rep[[1]][1]) == 1)){
    if(isTRUE(match("{true}",cong_prop_rep[[1]][2])== 1)){
      prop_congr = 1 #80%
    }else{
      prop_congr = 2 #20%
    }
  }else if(isTRUE(match("réponse",cong_prop_rep[[1]][1]) == 1)){
    response = cong_prop_rep[[1]][2] #le réponse sous le format {couleur}
  }else if(isTRUE(match("TRUE",testX[k]) == 1)){
    error = 0 #pas d'erreur
  }else if(isTRUE(match("FALSE",testX[k]) == 1)){
    error = 1 #une erreur
  }else if(isTRUE(match("RT",cong_prop_rep[[1]][1]) == 1)){
    RT = cong_prop_rep[[1]][2] #le temps de réaction
  }else if(isTRUE(match("IT",cong_prop_rep[[1]][1]) == 1)){
    IT = cong_prop_rep[[1]][2] #l'autre temps
  }else{
    X = append(X,testX[k])
    Y = append(Y,testY[k])
  }
  
  }
}

