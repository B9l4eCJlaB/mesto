export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(infoSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
      }
      getUserInfo() {
        return {
                name: this._nameElement.textContent,
                description: this._descriptionElement.textContent
                }
      }

      setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._descriptionElement.textContent = data.about;
        this.setUserAvatar(data)
      }
      setUserAvatar(data) {
        this._profileAvatar.src = data.avatar
      }

    }