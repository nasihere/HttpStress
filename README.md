# HttpStress

Required Parameter
--------------------------------------------------
1. --options=host:localhost,port:8000,path:/users,method:GET
2. --time=3000
3. --request=2000
--------------------------------------------------
Optional Parameter
1. --fork=10
2. --loop
3. --error
4. --logs

# Example HttpSress:
e.g: node httpstress.js --options=host:localhost,port:8000,path:/users,method:GET --request=2000 --time=3000

# Sample Hello World 
node helloworld.js --fork=4

