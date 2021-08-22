const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/URLShortener",{useNewUrlParser:true,useUnifiedTopology:true});
// mongoose.connect("mongodb+srv://admin-amir:amir@cluster0.uorzb.mongodb.net/toDoList?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect("mongodb+srv://amir:amir@cluster0.lvvwx.mongodb.net/Cluster0?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
var ls='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
var len=ls.length;
// var homeurl="localhost:3000";
var homeurl="https://clya.herokuapp.com";
function generateUniqueKey(num){
    var s="";
    while (num!==0) {
        s=s+ls[num%len];
        num=Math.floor(num/len);
        
    }
    return s;
}

const numberOfpeopleSchema=new mongoose.Schema({
    _id:Number,
    count:Number
});

const UrlSchema=new mongoose.Schema({
    givenUrl:String,
    generatedUrl:String
});

const url=new mongoose.model("url",UrlSchema);

const numerOfPeople=new mongoose.model("count",numberOfpeopleSchema);




app.get("/",function(req,res){
    res.render("home");
});

app.post("/",function(req,res){
    var givenUrl=req.body.url;
    if(givenUrl.length){
        numerOfPeople.findOne({_id:1},function(err,found){
            if(!err){
                var count=found.count+1;
                console.log(found.count);
                numerOfPeople.updateOne({_id:1},{count:count},function(err,docs){
                    if(!err){
                        var s=generateUniqueKey(count);
                        var generatedUrl=homeurl+"/"+s;
                        const newUrl=new url({
                            givenUrl:givenUrl,
                            generatedUrl:s
                        });
                        newUrl.save();
                        res.render("gen",{url:generatedUrl});
                    }
                });
            }
        });
    }
    else
        res.redirect("/");
});


app.get("/:address",function(req,res){
    var address=req.params.address;
    url.findOne({generatedUrl:address},function(err,found){
        if(!err && found!==null){
            res.redirect(found.givenUrl);
        }
        else
            res.redirect("/");
    });
});



app.listen(process.env.PORT || 3000,function(){
    console.log("Listening to 3000");
})
