function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceUnderScoreWithSpace(key) {
  return key.split("_").join(" ");
}

export { capitalizeFirstLetter, replaceUnderScoreWithSpace };
