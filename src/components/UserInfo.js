export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(infoSelector);
      }
      getUserInfo() {
        return {
                name: this._nameElement.textContent,
                description: this._descriptionElement.textContent
                }
      }

      setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._descriptionElement.textContent = data.description;
      }

    }