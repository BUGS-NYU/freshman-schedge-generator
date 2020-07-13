# Contributing
d
- [Setup](#Setup)
- [Issue](#issue)
- [Pull Request](#request)
- [Comment Annotations](#comment-annotations)

## Setup
- [node](https://github.com/nodejs/node.git)
- [npm](https://github.com/npm)
- [React](https://reactjs.org/)
- [styled-components](https://styled-components.com/)
- [axios](https://github.com/axios/axios)

Please fork the repository from Github and clone a local copy to your machine. After forking, cd into your perferred directory and run on your terminal:

```
git clone https://github.com/{YOUR-USER-NAME}/freshman-schedge-generator.git
```

Then following these command if you haven't had any installed.

## Installation

### MacOS
If you have [homebrew](https://brew.sh/). If not, please go to the website and install homebrew. Then install node.

```
brew install node
```

Then cd into the local copy you have made and run
```
npm install                               //installing all dependecies
npm install --save styled-components     // installing styled-components if not installed
npm install --save axios                 // installing axios if not installed
```

## Setup Issue
If you have trouble with Eslint version. Please follow the suggested method in the error message. If it still doesn't work, you can ignore it by doing the following:
- Creating a `.env` file in the directory
- Add `SKIP_PREFLIGHT_CHECK=true` to the file.


## Issue
Remember to include enough information if you're reporting a bug.
Asking question through an issue is totally fine as well.

## Pull Request
It would be best to develop your feature with a new branch other than master.
Every PR will be considered.

### Before Creating a PR
- Making sure that the code compiles and test your code.

## Comment Annotations
- If there is any code pieces with abbreviation, please don't assume other users would understand.
- Leave a comment if you think a comment would be necessary to understand your code.
