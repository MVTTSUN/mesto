export default class UserInfo {
  constructor(selectorName, selectorStatus) {
    this._nameElement = document.querySelector(selectorName);
    this._statusElement = document.querySelector(selectorStatus);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      status: this._statusElement.textContent
    }
  };

  setUserInfo({name, status}) {
    this._nameElement.textContent = name;
    this._statusElement.textContent = status;
  };
}