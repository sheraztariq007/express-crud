import express from 'express';
import { PrismaClient } from '@prisma/client'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));


const port = 4000;
const prisma = new PrismaClient()



app.post('/user',async (req, res) => {
    let user = await prisma.user.create({
        data :{
            email:req.body.email,
            name:req.body.name
        }
    })
    res.json({error:null,response:user});
});

app.delete('/user/:user_id',async (req, res) => {
    let user = await prisma.user.delete({
        where :{
            id:+req.params.user_id
        }
    })
    res.json({error:null,response:user});
});


app.put('/user/:user_id',async (req, res) => {
    let user = await prisma.user.update({
        where :{
            id:+req.params.user_id
        },
        data :{
            email:req.body.email,
            name:req.body.name
        }
    })
    res.json({error:null,response:user});
});



app.get('/users',async (req, res) => {
    let users = await prisma.user.findMany()
    res.json({error:null,response:users});
});




app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
