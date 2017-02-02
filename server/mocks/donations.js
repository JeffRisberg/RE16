module.exports = function (app) {
    var express = require('express');
    var donationsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    donationsRouter.use(bodyParser.json());

    var donationsDB = app.donationsDB;

    donationsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donationsDB.find(req.query).exec(function (error, donations) {
            res.send({
                'status': 'ok',
                'data': donations
            })
        })
    });

    donationsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        donationsDB.find({}).sort({id: -1}).limit(1).exec(function (err, donations) {

            if (donations.length != 0)
                req.body.item.id = donations[0].id + 1;
            else
                req.body.item.id = 1;

            // Insert the new record
            donationsDB.insert(req.body.item, function (err, newItem) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newItem]});
            })
        });
    });

    donationsRouter.get('/:id', function (req, res) {
        donationsDB.find({id: req.params.id}).exec(function (error, donations) {
            if (donations.length > 0)
                res.send({
                    'status': 'ok',
                    'data': donations
                });
            else {
                res.status(404);
                res.send({
                    'status': 'missing',
                    'data': null
                });
            }
        });
    });

    donationsRouter.put('/:id', function (req, res) {
        var item = req.body.item;

        donationsDB.update({id: req.params.id}, item, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [item]});
        });
    });

    donationsRouter.delete('/:id', function (req, res) {
        donationsDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/api/donations', donationsRouter);
};
