const app = require('../app')

app.set('port', 8080)
const server = app.listen(app.get('port'), () => {
    console.log("server is listen on port");
})