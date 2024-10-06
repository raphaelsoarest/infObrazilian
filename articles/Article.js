const express = require("express");
const router = express.Router();
const Category_model = require("../categories/Category_model");
const Article_model = require("./Article_model");
const slugify = require("slugify")

router.get("/admin/articles", (req, res) => {
    Article_model.findAll({
        include: [{model: Category_model}]
    }).then(articles => {
        res.render("admins/articles/index", {articles: articles});
    });
    
});

router.get("/admin/articles/new", (req, res) =>{
    Category_model.findAll().then(categories => {
        res.render("admins/articles/new", {categories: categories});
    });
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title_article;
    var article_body = req.body.body_article;
    var id_category = req.body.id_category;

    Article_model.create({
        title: title,
        slug: slugify(title),
        body: article_body,
        categoryId: id_category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.delete_id;
    if(id != undefined){
        if(!isNaN(id)){
            Article_model.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles")
            });
        }else{
            res.redirect("/admin/article");
        }
    }else{
        res.redirect("/admin/articles");
    };
})










module.exports = router;