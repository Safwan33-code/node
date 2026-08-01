const express = require("express")
const mongoose = require("mongoose")

const app = express()

const Article = require("./models/article")


mongoose.connect("mongodb+srv://safwan:12345@myfirstnodejs.h0hxusl.mongodb.net/?appName=myfirstnodejs")
.then(() => {
    console.log("connecting successfully")
}).catch((error)=> {
    console.log("error withe connecting withe database", error)
})

app.use(express.json())


app.get("/number", (req, res)=> {
    let numbers ="";
    for(let i = 0; i <= 100; i++) {
        numbers += i + "-";
    }
    // res.send(`the number is: ${numbers}`);

    // res.sendFile(__dirname + "/views/numbers.html")

    res.render("numbers.ejs", {
        name: "yarob",
        numbers: numbers,
    });

});

app.get("/findsummation/:number1/:number2", (req, res)=> {
    const num1 = req.params.number1
    const num2 = req.params.number2

    const total = Number(num1) + Number(num2)

    // console.log(req.params)
    // res.send(`the numbers are ${num1}/${num2}`);
    res.send(`the total is: ${total}`);
    })

app.get("/sayhello", (req, res)=> {
    // console.log(req.body)

    // console.log(req.query)
    // res.send(`hello ${req.body.name} Age is ${req.query.age}`);

    res.json({
        name: req.body.name,
        age: req.query.age
    })
})

app.get("/", (req, res)=> {
    res.send("hello onde");
})

app.get("/hi", (req, res)=> {
    res.send("you visited hi");
})

app.put("/test", (req, res)=> {
    res.send("you visited test");
})

app.post("/addcomment", (req , res)=> {
    res.send("post request on add comment");
})

app.delete("/testingdelet", (req, res) => {
    res.send("visited delete request")
})


// ======== Articles Endpoints===========
app.post("/article", async (req,res) => {
    const newarticle = new Article()

    const artTitle = req.body.articleTitle
    const artBody = req.body.articleBody

    // res.send(artTitle + " " + artBody)
    // return;
    newarticle.title = artTitle
    newarticle.body = artBody
    newarticle.numberOfLikes = 100

    await newarticle.save()

    // res.send("the new article has been stored")
    res.json(newarticle)
    
})



app.get("/articles", async (req, res) => {
    const articles = await Article.find()
    res.json(articles);
})




app.get("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findById(id);
        res.json(article);
        return;
    }catch (error){
        console.log("error while reading article of id", id);
        return res.send("error");
    }
    
});



app.delete("/articles/:articleId", async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findByIdAndDelete(id);
        res.json(article);
        return;
    }catch (error){
        console.log("error while reading article of id", id);
        return res.send("error");
    }
    
});


app.get("/showArticles", async (req, res) => {
    const articles = await Article.find()
    res.render("articles.ejs", {
        allArticles: articles,
    });
})


app.listen(3000, () => {
    console.log("l am listening in port 3000")
})

