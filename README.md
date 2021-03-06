# [Tibetan Learning App](https://shangshungfoundation.github.io/tib_learn_app/)
[1st Merigar Hackathon project](ShangShungFoundation/1st_merigar_hackathon) organized by [Shang Shung Foundation](shangshungfoundation.org)

**[Website](https://shangshungfoundation.github.io/tib_learn_app/)** | 
[Github](https://github.com/ShangShungFoundation/tib_learn_app/) | 
[Tasks](https://github.com/ShangShungFoundation/tib_learn_app/projects/1) | 
[Issues](https://github.com/ShangShungFoundation/tib_learn_app/issues)

## Project Coordinator: 

## Description
An online tool to learn Tibetan (mostly classical).

Divided into two main parts:

1. writing system and pronunciation (standard Tibetan, common to classical and modern languages)
2. presentation of the grammar of classical Tibetan - grammatical syllables and their function - illustrated and clarified by examples.
Can have possible further ramifications: 	
	- a platform for translators and translations from classical Tibetan
	- a dictionary of quotations of classical Tibetan

## Purpose
* Provide a tool for self-learning of Tibetan pronunciation and classical Tibetan grammar. 
* Provide additional materials for students of SSF Classical Tibetan courses.
* Work as a reference point for people learning to translate and working with translation

## Who it’s for? 
Anyone interested

## Why they would want to use it?
Extremely useful tool for those interested in Classical Tibetan, Tibetan Traditions, Tibetan Culture and related subjects

## Expected Features: 
- Unicode support
- Multilanguage

## Checkpoints: 
- [ ] Syllabe preview with wylie and pronuciation (mp3 audio)
- [ ] Searchabe tib syllabes libary
- [ ] Tibetan phrases with syllabes hints (form syllabes libary)
- [ ] Tibetan phrases with syntax and grammar explanations

## Technologies: 

[JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics), [ES6](https://babeljs.io/learn-es2015/), [React](https://facebook.github.io/react/), [Bootstrap](http://getbootstrap.com/getting-started/), [Browserify](https://codeutopia.net/blog/2016/01/25/getting-started-with-npm-and-browserify-in-a-react-project/)

## Backend:
node.js, Google sheets (json export)

## Difficulty: 
Medium

## Recommended toolset:
   - Editor: [Sublime Text 3](https://www.sublimetext.com/3) with [react support](https://medium.com/@adrianli/setting-up-sublime-text-3-for-reactjs-3bf6baceb73a), [Atom](https://atom.io/) [with react](https://medium.com/productivity-freak/my-atom-editor-setup-for-js-react-9726cd69ad20) or Vim ;)
   - Git client: Shell, [Git Desktop](https://desktop.github.com/)
   - [Extension - React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

## Resources:
* [Exporting audio using Audacity](https://docs.google.com/a/shangshunginstitute.org/document/d/1Earmi3QY5TuGw-K94hTVOaITLj6RH5MA0Kz5wRMhIKA/edit?usp=sharing)
* [spreadseet data](https://docs.google.com/spreadsheets/d/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/edit?usp=sharing)
* [syllabes - json data](https://sheets.googleapis.com/v4/spreadsheets/1D6NW7phdjwmz7bnncNgJcwNVgwn39SsOCVvZ403VilE/values/syllabes-unique!A1%3AC4056?key=AIzaSyCSZo1p3NxY73vcsDo554y3chNSTp4uhqY)

### Bootstrap Project
Assuming that you have node.js installed globally. More [info](https://github.com/facebookincubator/create-react-app)
```sh
npm install -g create-react-app

create-react-app tib_learn_app
cd tib_learn_app/
npm install --save gh-pages
git init
rm package.json README.md
git add .
git commit -m "First commit"
git remote add origin https://github.com/ShangShungFoundation/tib_learn_app.git
git pull origin master --allow-unrelated-histories
npm start
```

###  Start Project
`npm start`

###  Deploy Project
`npm run deploy`

## Acknowledgements
We are grateful to following persons for their ideas and collaboration:

* Prof. Fabian Sanders (initial idea, content, supervision)
* Lobsang Zatul
* Tsering Sangpo
* Daniel Simonelli
* Тatiana Аржакова
* Kamil Selwa

## Licence: [MIT License](LICENSE)
