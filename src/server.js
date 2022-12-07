const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');
var cookieParser = require('cookie-parser');


const route = require('./routes/index.router');
app.use(cookieParser());
const { sequelize } = require('./app/models/index');

// Static file
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// set view engine express-handlebars
app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
        helpers: {
            ifCond: function(check,value, options) {
                if(check !== value) {
                    return options.inverse(this);
                }
                return options.fn(this);
            },
			ifNotEmpty: function(check, options) {
				if(typeof check !== 'undefined' && check.length !== 0) {
					return options.fn(this);
                }
				return options.inverse(this);
			},
			ifEmpty: function(check, options) {
				if(typeof check !== 'undefined' && check.length === 0) {
					return options.fn(this);
                }
				return options.inverse(this);
			},
			toVND: function(money,options) {
				if(money) {
					return money.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
				} else {
					return options.fn(this);
				}
			},
			toNghiLam: function(status,options) {
				if(status && status === true) {
					return 'Làm'
				} else if(status=== false) {
					return 'Nghỉ'
				} else {
					return options.fn(this);
				}
			},
			converTo0: function(num,options) {
				if(num === null) {
					return null
				} else if(num !== null) {
					return 'Có'
				} else {
					return options.fn(this);
				}
			},
			toUpperCase: function(text,options) {
				if(text) {
					return text.toUpperCase();
				} else {
					return options.fn(this);
				}
			},
			
        },
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//# Routes init
route(app);

//@ midlleware
app.get('/', function(req, res, next) {
	 // Cookies that have not been signed
	if(!req.cookies['tai khoan']) {
		return res.redirect('/auth/login');
	} else {
		if (req.cookies['loai'] === 'NV') {
			return res.redirect(`/${req.cookies['tai khoan']}`)
		} else if ((req.cookies['loai'] === 'KT')) {
			return res.redirect(`/admin/ketoan`)
		} else {
			return res.redirect(`/admin/quanly`);
		}
	}

	
})

app.listen(port, async () => {
	console.log(
		`****************** Server up on http://localhost:${port}/ ******************`,
	);
	// await sequelize.sync({ force: true });
	// console.log("Database synced");
	await sequelize.authenticate();
	console.log('Database saved');
});
