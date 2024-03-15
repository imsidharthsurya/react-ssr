import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server"
import fs from "fs";
import path from "path";
import App from "../src/App";

const app=express();

app.use('^/$',(req,res,next)=>{
    fs.readFile(path.resolve('./build/index.html'),'utf-8',(err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send("error happened while ssr");
        }

        return res.send(data.replace('<div id="root"></div>',`<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>`))
    })
})

app.use(express.static(path.resolve(__dirname,'..','build')))
app.listen(8080,()=>{
    console.log("server is running on port 8080")
})