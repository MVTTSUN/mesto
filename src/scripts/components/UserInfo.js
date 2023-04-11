export default class UserInfo {
  constructor(selectorName, selectorStatus, selectorAvatar) {
    this._nameElement = document.querySelector(selectorName);
    this._statusElement = document.querySelector(selectorStatus);
    this._avatarElement = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      avatar: this._avatarElement.src,
      name: this._nameElement.textContent,
      about: this._statusElement.textContent,
      id: this._id
    };
  };

  setUserInfo({name, about, avatar, _id}) {
    this._id = _id;
    this._nameElement.textContent = name;
    this._statusElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
  };

  getUserId() {
    return this._id;
  }
}