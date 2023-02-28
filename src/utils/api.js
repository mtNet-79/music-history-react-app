import {
  _getComposers,
  _getPerformers,
  _getUsers,
  _saveUser,
  _saveComposer,
  _savePerformer,
  _getStyles,
  _getTitles,
  _getRecordings,
  _getCompositions,
} from "./_DATA";

export function generateRandomAvatar() {
  fetch("https://avatar-endpoint.herokuapp.com/api/");
}

export async function getInitialData() {
  const [
    users,
    composers,
    performers,
    styles,
    titles,
    compositions,
    recordings,
  ] = await Promise.all([
    _getUsers(),
    _getComposers(),
    _getPerformers(),
    _getStyles(),
    _getTitles(),
    _getRecordings(),
    _getCompositions(),
  ]);

  console.log("AT API :", composers)
  return {
    users,
    composers,
    performers,
    styles,
    titles,
    compositions,
    recordings,
  };
}

export function saveUser(info) {
  return _saveUser(info);
}

export function saveComposer(info) {
  return _saveComposer(info);
}

export function savePerformer(info) {
  return _savePerformer(info);
}
