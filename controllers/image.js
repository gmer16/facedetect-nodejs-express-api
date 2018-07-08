// Clarifai
const Clarifai = require('clarifai');
const app = new Clarifai.App({
  apiKey: 'a591935006d6421ba35559d9ee******' // your own Clarifai API Key here
 });

const handleAPICall = (req, res) => {
    app.models // accessing the Clarifai API
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
           res.json(data);
           console.log(data);
       })
       .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}
