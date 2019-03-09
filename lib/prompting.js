const inquirer = require("inquirer");
const utils = require("../lib/utils");

function ask(questions) {
  const formatedQuestions = utils.traduceQuestions(questions);

  return inquirer.prompt(formatedQuestions);
}

module.exports = {
  ask
};
