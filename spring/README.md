## Spring Backend

#### create user

`curl -i -X POST -H 'Content-Type: application/json' -d '{"firstName": "TestVorname", "lastName": "TestNachname", "beginOfApprenticeship": "2018-07-31", "label": "Anwendungsentwickler", "username": "test", "password": "123123"}' http://localhost:8081/register`

#### authenticate user (get token)

`curl -i -X POST -H 'Content-Type: application/json' -d '{"username": "test", "password": "123123"}' http://localhost:8081/authenticate`

#### test endpoint

`curl -i -X GET -H "Authorization: Bearer <TOKEN HERE>" http://localhost:8081/user`