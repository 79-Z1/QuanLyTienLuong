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
            ifCond: function(check, options) {
                if(!check) {
                    return options.inverse(this);
                }
                return options.fn(this);
            }
            
        }
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
