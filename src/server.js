const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const cors = require('cors');


const route = require('./routes/index.router');
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
			}
        },
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//# Routes init
route(app);

app.listen(port, async () => {
	console.log(
		`****************** Server up on http://localhost:${port}/ ******************`,
	);
	// await sequelize.sync({ force: true });
	// console.log("Database synced");
	await sequelize.authenticate();
	console.log('Database saved');
});
