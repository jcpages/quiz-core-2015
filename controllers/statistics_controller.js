var models = require('../models/models.js');

exports.statistics = function(req, res){
	var with_Comments=[];
	var without_Comments;
	models.Quiz.count().then(function(quizes){
		models.Comment.findAll(
			        {where:{publicado: true}}).then(function(comments){
			        without_Comments=quizes;
			        for(var i=0; i<comments.length;i++){
				       if(with_Comments[comments[i].QuizId]===undefined){
					      without_Comments--;
				       }
				    with_Comments[comments[i].QuizId]=1;
			        }
			        res.render('quizes/statistics',
				        {quizes: quizes,
				         comentarios: comments.length,
				         media_comentarios: comments.length/quizes,
				         sin_comentarios:without_Comments,
				         con_comentarios:quizes-without_Comments,
				         errors: []
		            });
		        });
	});
};		    