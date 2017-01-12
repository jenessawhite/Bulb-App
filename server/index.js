if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config(); // environment variables, used for hiding secrets
}

var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Connect to a sql database
var sequelize = new Sequelize(process.env.DATABASE_URL);

// We need to define models. A model describes the structure of
// something that we want to store in the database. On each model
// we define each of the fields on that model. We can also decide
// to have different internal and external field names. Internal
// fields would be the column names in the database, external are
// what you would use in your code.

//Define User
var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
    validate: {
      notEmpty: true,
    }
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
    validate: {
      notEmpty: true,
    }
  },
}, {
  freezeTableName: true
});

//Define Project
var Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
}, {
  freezeTableName: true
});

//Define Budget
var Budget = sequelize.define('budget', {
  estimated: {
    type: Sequelize.FLOAT,
    field: 'estimated',
  },
  actual: {
    type: Sequelize.FLOAT,
    field: 'actual',
  },
}, {
  freezeTableName: true
});

//Define materials
var Material = sequelize.define('material', {
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  description: {
    type: Sequelize.TEXT,
    field: 'description',
  },
  quantity: {
    type: Sequelize.INTEGER,
    field: 'quantity',
    validate: {
      isNumeric: true,
    }
  },
  checked: {
    type: Sequelize.BOOLEAN,
    field: 'checked'
  },
}, {
  freezeTableName: true
});

//Define photos
var Photo = sequelize.define('photo', {
  title: {
    type: Sequelize.STRING,
    field: 'name'
  },
  url: {
    type: Sequelize.STRING,
    field: 'photo_url',
  },
}, {
  freezeTableName: true
});


//Define tasks
var Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  goalDate: {
    type: Sequelize.DATEONLY,
    field: 'goal_date',
    defaultValue: Sequelize.NOW
  },
  completed: {
    type: Sequelize.BOOLEAN,
    field: 'completed'
  },
}, {
  freezeTableName: true
});


// THIS IS THE DON'T GET FIRED CLAUSE
// Seeding (or preloading) your database gives it dummy data
// so that development isn't a graveyard. In production we
// probably don't want to delete the entire database :)
//
if(process.env.NODE_ENV !== 'production') {
  // Remove all projects from the database when the server starts
  Project.sync({force: true}).then(function () {
    // Some sample projects
    var projects = [
      {
        name: 'Kitchen',
        tasks: [
          {
            title: 'Stain floors',
            goalDate: '2017-01-28',
            completed: false
          },
          {
            title: 'Install baseboards',
            goalDate: '2017-01-30',
            completed: false
          },
        ]
      },
      {
        name: 'Bathroom',
      },
    ];
    // Actually insert all of the projects
    return projects.map((project) => {
      return Project.create(project)
    });
  });
  // Remove the budgets from the database when the server starts
  Budget.sync({force: true}).then(function () {
    //sample budget
    var budgets = [
      {
        estimated: 1500,
        actual: 1503.98,
      },
    ];
    // Actually insert all of the projects
    return budgets.map((budget) => {
      return Budget.create(budget)
    });
  });
  // Remove all materials from the database when the server starts
  Material.sync({force: true}).then(function () {
    // Some sample projects
    var materials = [
      {
        name: 'stain',
        description: 'get the minwax ebony stain in a gallon',
        quantity: 4,
        checked: false,
      },
      {
        name: 'sandpaper',
        description: 'all 3 grits for staining',
        quantity: 2,
        checked: false,
      },
    ];
    // Actually insert all of the projects
    return materials.map((material) => {
      return Material.create(material)
    });
  });
  // Remove all materials from the database when the server starts
  Photo.sync({force: true}).then(function () {
    // Some sample projects
    var photos = [
      {
        title: 'stain',
        url: 'https://placeholdit.imgix.net/~text?txtsize=19&txt=200×200&w=200&h=200',
      },
      {
        title: 'stain',
        url: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=350%C3%97325&w=350&h=325',
      },
    ];
    // Actually insert all of the projects
    return photos.map((photo) => {
      return Photo.create(photo)
    });
  });
  // Remove all tasks from the database when the server starts
  Task.sync({force: true}).then(function () {
    // Some sample tasks
    var tasks = [
      {
        title: 'Stain floors',
        goalDate: '2017-01-28',
        completed: false
      },
      {
        title: 'Install baseboards',
        goalDate: '2017-01-30',
        completed: false
      },
    ];
    // Actually insert all of the tasks
    return tasks.map((task) => {
      return Task.create(task)
    });
  });
}

// Create a new express app to server our api
var app = express()

// Teach express how to parse requests of type application/json
//
app.use(bodyParser.json());

// Teach express how to parse requests of type application/x-www-form-urlencoded
//
app.use(bodyParser.urlencoded({ extended: true }));

// A basic GET route with no functionality and no security protection
app.get('/api', (req, res) => {
  res.send('Hello World!')
});

// OTHER ROUTES USING SEQUELIZE HERE

// Get all projects
app.get('/api/projects', (req, res) => {
  //sanity check
  // res.send('Houston, we have projects!!')

  // Find all projects
  Project.findAll().then((projects) => {
    res.json(projects);
  })
});

// Create a new project
app.post('/api/projects', (req, res) => {
  res.send('Got ourselves a POST request!')
});

// Delete a project
app.delete('/api/projects', function (req, res) {
  res.send('Got a DELETE request at /projects')
});

// Get the budget
app.get('/api/budget', (req, res) => {
  //sanity check
  // res.send('Houston, we have a budget!!')

  // Find all budget
  Budget.findAll().then((budget) => {
    res.json(budget);
  })
});

// Create a new budget
app.post('/api/budget', (req, res) => {
  res.send('Got ourselves a POST request!')
});

// Get all materials
app.get('/api/materials', (req, res) => {
  //sanity check
  // res.send('Houston, we have materials!!')

  // Find all materials
  Material.findAll().then((materials) => {
    res.json(materials);
  })
});

// Create a new material
app.post('/api/materials', (req, res) => {
  res.send('Got ourselves a POST request!')
});

// Delete a material
app.delete('/api/materials', function (req, res) {
  res.send('Got a DELETE request at /materials')
});

// Get all photos
app.get('/api/photos', (req, res) => {
  //sanity check
  // res.send('Houston, we have photos!!')

  // Find all photos
  Photo.findAll().then((photos) => {
    res.json(photos);
  })
});

// Create a new photo
app.post('/api/photos', (req, res) => {
  res.send('Got ourselves a POST request!')
});

// Delete a photo
app.delete('/api/photos', function (req, res) {
  res.send('Got a DELETE request at /photos')
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  //sanity check
  // res.send('Houston, we have tasks!!')

  // Find all tasks
  Task.findAll().then((tasks) => {
    res.json(tasks);
  })
});

// Get all tasks by project id
app.get('/api/projects/:id/tasks', (req, res) => {
  //sanity check
  res.send(req.params)

  // Find all projects
  // Project.findAll().then((projects) => {
  //   res.json(projects);
  // })
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  res.send('Got ourselves a POST request!')
});

// Delete a task
app.delete('/api/tasks', function (req, res) {
  res.send('Got a DELETE request at /tasks')
});

// Determine which port to listen on
var port = process.env.PORT ? process.env.PORT : 3001

// Actually start the server
app.listen(port, () => {
  console.log('Example app listening on port ' + port + '!')
})
