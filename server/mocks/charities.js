module.exports = function (app) {
    var express = require('express');
    var charitiesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    charitiesRouter.use(bodyParser.json());

    var charitiesDB = app.charitiesDB;

    charitiesRouter.get('/', function (req, res) {
        delete req.query["_"];
        charitiesDB.find(req.query).exec(function (error, charities) {
            res.send({
                'status': 'ok',
                'data': charities
            })
        })
    });

    charitiesRouter.post('/', function (req, res) {
        // Look for the most recently created record
        charitiesDB.find({}).sort({id: -1}).limit(1).exec(function (err, charities) {

            if (charities.length != 0)
                req.body.event.id = charities[0].id + 1;
            else
                req.body.event.id = 1;

            // Insert the new record
            charitiesDB.insert(req.body.event, function (err, newEvent) {
                res.status(201);
                res.send({'status': 'ok', 'data': [newEvent]});
            })
        });
    });

    charitiesRouter.get('/:id', function (req, res) {
        charitiesDB.find({id: req.params.id}).exec(function (error, charities) {
            if (charities.length > 0)
                res.send({
                    'status': 'ok',
                    'data': charities
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

    charitiesRouter.put('/:id', function (req, res) {
        var event = req.body.event;

        charitiesDB.update({id: req.params.id}, event, {}, function (err, count) {
            res.send({'status': 'ok', 'data': [event]});
        });
    });

    charitiesRouter.delete('/:id', function (req, res) {
        charitiesDB.remove({id: req.params.id}, {}, function (err, count) {
            res.status(204).end();
        });
    });

    app.use('/api/charities', charitiesRouter);
};
