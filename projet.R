library(jsonlite)
library(ggpubr)
library(rstatix)

#choisir un autre fichier pour les tests
dat1 <- fromJSON("https://rafael.laboissiere.net/m1-miashs-2024-s8/Cho0gooz/data/2024-05-02-20-44-20.json")

testX = unlist(dat1$mesureX)
testY = unlist(dat1$mesureY)

df <- data.frame(subject=numeric(),trial=character(),response=character(),congruence=numeric(),prop_congr = numeric(),IT=numeric(),RT=numeric(),error = numeric(),auc = numeric())
X = c()
Y = c()
coord = c()

area.polygon <- function (x, y) {
  n <- length (x)
  return (abs (sum (x [1 : (n - 1)] * y [2 : n]
                    - x [2 : n] * y [1 : (n - 1)])) / 2)
}

#il faudra faire une boucle pour chaque bloc
compte = 0
first = 0
len = length(testX)
for(k in 1:len){
  if(identical(testX[k],'{') || identical(testX[k],'}')){
  }
  else{
  start = strsplit(testX[k],':')
  cong_prop_rep = strsplit(testX[k],' ')
  if(isTRUE(match("start",start[[1]][1]) == 1)){
    if(compte >= 1){
      X[is.na(X)] = 0;
      Y[is.na(Y)] = 0;
      X = as.numeric(X)
      Y = as.numeric(Y)
      auc = area.polygon(append(X,X[1]),append(Y,Y[1]))
      dfi <- data.frame(subject,trial,response,congruence,prop_congr ,IT,RT,error,auc)
      df = rbind(df,dfi)
    }
    compte = compte +1 
    subject = start[[1]][2] #on met le n du sujet 
    trial = compte #le nombre d'essai au total
    first = 0
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
    if(first == 0 ){
      first = k
      coord = cbind(coord,X,Y)
      X = c()
      Y = c()
    }
    X = append(X,testX[k])
    Y = append(Y,testY[k])
  }
  
  }
}
coord = cbind(coord,X,Y)

i = 0
plot (coord[,1],coord[,2], asp = 1)
while(i<=40){
  lines (coord[,i+1], coord[,i+2],col = "green")
  print(i)
  print(area.polygon (append(coord[,i+1],coord[1,i+1]), append(coord[,i+2],coord[1,i+2])))
  i= i+2
}

attach(df)
data = aggregate(auc~subject*congruence*prop_congr,df,mean)
boxplot(auc~congruence*prop_congr,data = data)
