const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Category_model = require("./Category_model");



router.get("/categories", (req, res) => {
    res.send("ROTA CATEGORIA");
});

router.get("/admins/categories/new", (req, res) =>{
    res.render("admins/categories/new")
});

router.post("/categories/save", (req, res) =>{
    var title = req.body.title;
    if(title != undefined){
        Category_model.create({
            title: title,
            slug: slugify(title),
        }).then(() => {
            res.redirect("/admin/categories");
        })
    }else{
        res.redirect("/admins/categories/new")
    }
});

router.get("/admin/categories", (req, res) => {
    Category_model.findAll().then(categories => {
        res.render("admins/categories/index", {categories: categories});
    });
})


router.post("/categories/delete", (req, res) => {
    var id = req.body.delete_id;
    if(id != undefined){
        if(!isNaN(id)){
            Category_model.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories")
            });
        }else{
            res.redirect("/admin/categories");
        }
    }else{
        res.redirect("/admin/categories");
    };
})

router.get("/admin/categories/edit/:id", (req,res) => {
    var id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/categories")
    }
    Category_model.findByPk(id).then(category => {
        if(category != undefined){
            
            res.render("admins/categories/edit", {category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        res.redirect("/admin/categories");
    })
});


router.post("/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    Category_model.update({title : title, slug: slugify(title)},{
        where: {
            id : id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
});










module.exports = router;