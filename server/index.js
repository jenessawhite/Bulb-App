var seed;
if(process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config(); // environment variables, used for hiding secrets
  seed = require('seedquelize')
}

var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

// Connect to a sql database
if(process.env.NODE_ENV == 'production') {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    },
  });
} else {
  var sequelize = new Sequelize(process.env.DATABASE_URL_DEV, {
    dialect: 'postgres',
    protocol: 'postgres',
  });
}

// We need to define models. A model describes the structure of
// something that we want to store in the database. On each model
// we define each of the fields on that model. We can also decide
// to have different internal and external field names. Internal
// fields would be the column names in the database, external are
// what you would use in your code.

//Define Transaction
var Transaction = sequelize.define('transaction', {
  store: {
    type: Sequelize.STRING,
    field: 'store'
  },
  item: {
    type: Sequelize.STRING,
    field: 'item'
  },
  price: {
    type: Sequelize.FLOAT,
    field: 'price',
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
    type: Sequelize.FLOAT,
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
//Associate material to project
// Material.belongsTo(Project);

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

//Associate photo to project
// Photo.belongsTo(Project);

//Define tasks
var Task = sequelize.define('task', {
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  description: {
    type: Sequelize.TEXT,
    field: 'description',
  },
  goalDate: {
    type: Sequelize.STRING,
    field: 'goal_date',
  },
  completed: {
    type: Sequelize.BOOLEAN,
    field: 'completed'
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
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
}, {
  freezeTableName: true
});

// Define User
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


// Project.belongsTo(User);
Task.belongsTo(Project);
Material.belongsTo(Project);
Transaction.belongsTo(Project);
Budget.belongsTo(Project);
Photo.belongsTo(Project);

// User.hasMany(Project);
Project.hasMany(Task);
Project.hasMany(Material);
Project.hasMany(Transaction);
Project.hasMany(Budget);
Project.hasMany(Photo);

//Associate projects to user
// User.hasMany(Project);

// THIS IS THE DON'T GET FIRED CLAUSE
// Seeding (or preloading) your database gives it dummy data
// so that development isn't a graveyard. In production we
// probably don't want to delete the entire database :)
//
if(process.env.NODE_ENV !== 'production') {
  sequelize.sync({force: true}).then(() => {

    // Some sample projects
    var projects = {
      data: [
        {
          name: 'Kitchen',
          description: 'Gut job, new floors, cabinets, countertops',
        }, {
          name: 'Bathroom',
          description: 'Retile tub surround'
        },
      ],
      model: Project
    };

    var tasks = {
      data: [
        {
          title: 'Stain floors',
          description: 'Use the ebony stain from Home Depot',
          goalDate: 'May 1',
          completed: false,
          projectId: 1
        },{
          title: 'Install baseboards',
          description: 'Put in the wood painted baseboards from Menards',
          goalDate: 'Feb 28',
          completed: false,
          projectId: 2
        },{
          title: 'Demo kitchen',
          description: 'Rip out tile, countertops, flooring, cabinets',
          goalDate: 'March 9',
          completed: false,
          projectId: 1
        },{
          title: 'Demo bathroom',
          description: 'Rip out tile, countertops, flooring, sink and remove showerhead',
          goalDate: 'April 2',
          completed: false,
          projectId: 2
        },
      ],
      model: Task
    };

    var materials = {
      data: [
        {
          name: 'Stain',
          description: 'get the Minwax Ebony stain in a gallon',
          quantity: 4,
          checked: false,
          projectId: 1
        }, {
          name: 'Sandpaper',
          description: 'We need 120 and 80 grit (2 each)',
          quantity: 2,
          checked: false,
          projectId: 1
        },
        {
          name: 'Grout',
          description: 'Need enough to do 100 sq ft of small tiles. Gray colored.',
          quantity: 1,
          checked: false,
          projectId: 2
        }, {
          name: 'Small stone tiles',
          description: '12x12s look at quartz and a limestone type',
          quantity: 12,
          checked: false,
          projectId: 2
        },
      ],
      model: Material
    }

    var transactions = {
      data: [
        {
          store: 'Home Depot',
          item: 'Behr Paint (Lilac)',
          price: 45.09,
          projectId: 1
        }, {
          store: 'Home Depot',
          item: 'Sandpaper',
          price: 10.49,
          projectId: 1
        },
        {
          store: 'Menards',
          item: 'Semi-Smooth Roller',
          price: 8.61,
          projectId: 2
        }, {
          store: 'Lowes',
          item: 'Valspar Paint Diamond White quart',
          price: 45.09,
          projectId: 2
        }, {
          store: 'Home Depot',
          item: 'Fridgidaire M245 Micriowave',
          price: 175.09,
          projectId: 1
        }, {
          store: 'Home Depot',
          item: 'Copper drop pendant light',
          price: 345.11,
          projectId: 1
        },
        {
          store: 'Menards',
          item: 'Dropcloth',
          price: 3.20,
          projectId: 2
        }, {
          store: 'Lowes',
          item: 'Trowel',
          price: 6.43,
          projectId: 2
        },
      ],
      model: Transaction
    }

    var budgets = {
      data: [
        {
          actual: 0,
          estimated: 16000,
          projectId: 1
        }, {
          actual: 0,
          estimated: 1100,
          projectId: 2
        },
      ],
      model: Budget
    };

    var photos = {
        data: [
          {
          title: 'Kitchen before',
          url: 'https://i.imgur.com/7W51SXO.jpg',
          projectId: 1
        },
        {
          title: 'Bathtub before',
          url: 'https://i.imgur.com/hF3FRZp.jpg',
          projectId: 2
        },
        {
          title: 'Bathtub demo',
          url: 'https://i.imgur.com/IsRyhwc.jpg',
          projectId: 2
        },
      ],
      model: Photo
    };

    seed([
      projects,
      tasks,
      materials,
      transactions,
      budgets,
      photos
    ]).then(() =>{
      startExpress();
    });

  });

} else {
  startExpress();
}

function startExpress() {

  // Create a new express app to server our api
  var app = express()

  // Teach express how to parse requests of type application/json
  app.use(bodyParser.json());

  // Teach express how to parse requests of type application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // OTHER ROUTES USING SEQUELIZE HERE

  // --------------PROJECTS-------------------------

  // Get all projects
  app.get('/api/projects', (req, res) => {
    // Find all projects
    Project.findAll().then((projects) => {
      res.json(projects);
    }).catch(err => {
      console.log(err);
    })
  });

  // Create a new project
  app.post('/api/projects', (req, res) => {
    Project.create({
      name: req.body.name,
      description: req.body.description,
    }).then((projects) => {
      Project.findAll().then((projects) => {
        return (
          res.json(projects)
        )
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Delete a project
  app.delete('/api/projects/:id', function (req, res) {
    Project.destroy({
      where: {
        id: req.params.id,
      },
    }).then(()=>{
      Project.findAll().then((projects) => {
        return (
          res.json(projects)
        )
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });
  // --------------TRANSACTIONS-------------------------

  // Get all transactions
  app.get('/api/projects/:id/transactions', (req, res) => {
    // Find all transactions
    Transaction.findAll({
      where: {
        projectId: req.params.id,
      }
    }).then((transactions) => {
      res.json(transactions);
    }).catch(err => {
      console.log(err);
    })
  });

  // Get a single transaction
  app.get('/api/projects/:projectId/transactions/:id', (req, res) => {
    // Find all transactions
    Transaction.findAll({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((transactions) => {
      res.json(transactions);
    }).catch(err => {
      console.log(err);
    })
  });

  // Update a single transaction
  app.patch('/api/projects/:projectId/transactions/:id', (req, res, transaction) => {
    res.json(req.params.transaction)
    Transaction.update({
      price: !req.body.price
    }, {
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((transactions) => {
      Transaction.findAll().then((transactions) => {
        return (
          res.json(transactions)
        )
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Create a new transactions
  app.post('/api/projects/:id/transactions', (req, res) => {
    Transaction.create({
      where: {
        projectId: req.params.id,
      },
      store: req.body.store,
      item: req.body.item,
      price: req.body.price,
      projectId: req.params.id
    }).then((transactions) => {
      Transaction.findAll().then((transactions) => {
        console.log('Posted new transaction!')
        return (
          res.json(transactions)
        )
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Delete a transaction
  app.delete('/api/projects/:projectId/transactions/:id', function (req, res) {
    Transaction.destroy({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((transactions)=>{
      Transaction.findAll().then((transactions) => {
        return (
          res.json(transactions)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {})
  });


  // --------------BUDGET-------------------------

  // Get the budget
  app.get('/api/projects/:id/budget', (req, res) => {
    // Find all transactions
    Budget.findAll({
      where: {
        projectId: req.params.id,
      }
    }).then((budgets) => {
      res.json(budgets);
    }).catch(err => {
      console.log(err);
    })
  });

  // Get single budget
  app.get('/api/projects/:projectId/budget/:id', (req, res) => {
    // Find all transactions
    Budget.findAll({
      where: {
        projectId: req.params.projectId,
        id: req.params.id,
      }
    }).then((budgets) => {
      res.json(budgets);
    }).catch(err => {
      console.log(err);
    })
  });

  // Update the budget
  app.patch('/api/projects/:projectId/budget/:id', (req, res, budget) => {
    res.json(req.params.budget)
    Budget.update({
      estimated: !req.body.estimated
    }, {
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((budget) => {
      Budget.findAll().then((budget) => {
        console.log('updated!');
        return (
          res.json(budget)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Delete a budget
  app.delete('/api/:projectId/budget/:id', function (req, res) {
    Budget.destroy({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((budget)=>{
      Budget.findAll().then((budget) => {
        return (
          res.json(budget)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {})
  });

  // --------------MATERIALS-------------------------

  // Get all materials
  app.get('/api/projects/:id/materials', (req, res) => {
    // Find all tasks
    Material.findAll({
      where: {
        projectId: req.params.id,
      }
    }).then((materials) => {
      res.json(materials);
      });
  });

  // Get a single material
  app.get('/api/projects/:projectId/materials/:id', (req, res) => {
    // Find all tasks
    Material.findAll({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((materials) => {
      res.json(materials);
      });
  });

  // Update a single material
  app.patch('/api/projects/:projectId/materials/:id', (req, res, material) => {
    Material.update({
      checked: !req.body.checked
    }, {
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((materials) => {
      Material.findAll().then((materials) => {
        console.log('Checked off material!');
        return (
          res.json(materials)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Create a new material
  app.post('/api/projects/:id/materials', (req, res) => {
    Material.create({
      where: {
        projectId: req.params.id,
      },
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      checked: false,
      projectId: req.params.id
    }).then((materials) => {
      Material.findAll().then((materials) => {
        console.log('Posted new material!');
        return (
          res.json(materials)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Delete a material
  app.delete('/api/projects/:projectId/materials/:id', function (req, res) {
    Material.destroy({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((materials)=>{
      Material.findAll().then((materials) => {
        console.log('deleted');
        return (
          res.json(materials)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {})
  });

  // --------------PHOTOS-------------------------

  // Get all photos by project id
  app.get('/api/projects/:id/photos', (req, res) => {
    // Find all photos
    Photo.findAll({
      where: {
        projectId: req.params.id,
      }
    }).then((photos) => {
      res.json(photos);
      });
  });

  // Create a new photo
  app.post('/api/projects/:id/photos', (req, res) => {
    res.json('Got ourselves a POST request!')
//  Photo.create({
//    where: {
//      projectId: req.params.id,
//    },
//    url: 'saw'
//   }).then((photos) => {
//     Photo.findAll().then((photos) => {
//       res.json(photos);
//     }).catch(err => {
        //   console.log(err);
        // })
//   }).catch(err => {})
// });
  });

  // Delete a photo
  app.delete('/api/projects/:id/photos/:id', function (req, res) {
    res.json('Got a DELETE request at /photos')
    // Photo.destroy({
    //   where: {
    //     id: req.params.id,
    //   },
    // }).then(()=>{
    //   res.send('deleted')
    // }).catch(err => {})
  });

  // --------------TASKS-------------------------

  // Get all tasks by project id
  app.get('/api/projects/:id/tasks', (req, res) => {
    // Find all tasks
    Task.findAll({
      where: {
        projectId: req.params.id,
      }
    }).then((tasks) => {
      res.json(tasks);
      });
  });

  // Get a single task
  app.get('/api/projects/:projectId/tasks/:id', (req, res) => {
    // Find all tasks
    Task.findAll({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((tasks) => {
      res.json(tasks);
      });
  });

  // Create a new task
  app.post('/api/projects/:id/tasks', (req, res) => {
    Task.create({
      where: {
        projectId: req.params.id,
      },
      title: req.body.title,
      description: req.body.description,
      goalDate: req.body.goalDate,
      completed: false,
      projectId: req.params.id
    }).then((tasks) => {
      Task.findAll().then((tasks) => {
        console.log('Posted new task!');
        return (
          res.json(tasks)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Update a single task
  app.patch('/api/projects/:projectId/tasks/:id', (req, res, task) => {
    Task.update({
      completed: !req.body.completed
    }, {
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      }
    }).then((tasks) => {
      Task.findAll().then((tasks) => {
        console.log('Checked off task!');
        return (
          res.json(tasks)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });


  // Delete a task
  app.delete('/api/projects/:projectId/tasks/:id', function (req, res) {
    Task.destroy({
      where: {
        projectId: req.params.projectId,
        id: req.params.id
      },
    }).then((tasks) => {
      Task.findAll().then((tasks) => {
        console.log('deleted task!');
        return (
          res.json(tasks)
        );
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  });

  // Determine which port to listen on
  var port = process.env.PORT ? process.env.PORT : 3001

  // Actually start the server
  app.listen(port, () => {
    console.log('Example app listening on port ' + port + '!')
  })
}
