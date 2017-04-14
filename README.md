# HttpStress

Required Parameter
--------------------------------------------------
1. --options=host:localhost,port:8000,path:/users,method:GET
2. --time=3000
3. --request=2000
4. --fork=10
e.g: node httpstress.js --options=host:localhost,port:8000,path:/users,method:GET --request=2000 --time=3000
--------------------------------------------------
Optional Parameter
1. --loop
2. --error
3. --logs
