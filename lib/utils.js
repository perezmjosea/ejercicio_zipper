function traduceQuestions(questions) {
  return questions.map(item => {
    const newItem = {
      message: item.question,
      type: item.type,
      name: item.variableName,
      default: item.defaultValue,
      ...item
    };

    return newItem;
  });
}

module.exports = {
  traduceQuestions
};
