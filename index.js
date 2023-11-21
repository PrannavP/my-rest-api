const app = require('express')();
const port = 8080;

const fs = require('fs'); // file system
const path = require('path'); // path system

const cors = require('cors');
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
});

const gamesAPI = (req, res) => {
    // construct the path to the users JSON file inside the 'users' folder
    const filePath = path.join(__dirname, 'games', 'games.json');

    const gameName = req.query.name; // /games?name=leagueoflegends
    console.log(gameName);

    // reading the JSON file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err){
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        // parse the JSON data
        const jsonData = JSON.parse(data);

        // res.json(jsonData);

        // testing
        if(gameName){
            // const result = jsonData.filter(game => game.name.toLowerCase() === gameName.toLowerCase());
            const result = jsonData.filter(game => game.name.trim().toLowerCase().includes(gameName.trim().toLowerCase()));
            res.json({ jsonData: result });
        }else{
            res.json(jsonData);
        }
    });
};

const homeAPI = (req, res) => {
    res.send("hello mero api!");
};

app.get('/games', gamesAPI);
app.get('/', homeAPI);