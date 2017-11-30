module.exports = function(app){
	var HomeControll = {
		index: function(req,res){
			res.render('index', {title : 'Home - SejaSpotChallenge'});
		}
	}
	return HomeControll;
}