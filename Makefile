
deploy:
	git branch -D heroku
	git checkout master
	git checkout -b heroku
	grunt build
	git add -f public/
	git commit -m "Deploying to Heroku"
	git push heroku -f heroku:master
	git checkout master
