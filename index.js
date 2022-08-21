const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

// MiddleWare
const validateMiddleWare = require('./middleware/validationMiddleware');
const authMiddleWare = require('./middleware/authMiddleware');
const RedirectifAuthenticated = require('./middleware/RedirectifAuth');


// Controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);
app.use(
	expressSession({
		secret: 'keyboard cat',
	})
);
app.use(flash());
global.loggedIn = null;
app.use("*", (req,res,next)=>{
	loggedIn = req.session.userId;
	next();
});
mongoose.connect('mongodb+srv://azzam:taqi@cluster1.ucysdjs.mongodb.net/test', { useNewUrlParser: true });

let port = process.env.PORT;
if(port == null || port == ""){
	port = 4000;
}

app.listen(port, () => {
	console.log('Server is running on port 4000');
});

app.get('/', homeController);

app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleWare, newPostController);
app.post('/posts/store', authMiddleWare, storePostController);

app.get('/auth/register', RedirectifAuthenticated, newUserController);
app.post('/users/register', RedirectifAuthenticated, storeUserController);
app.get('/auth/login', RedirectifAuthenticated, loginController);
app.post('/users/login', RedirectifAuthenticated, loginUserController);
app.get('/auth/logout', logoutController);

app.use((req,res)=>{res.render('notfound')});
