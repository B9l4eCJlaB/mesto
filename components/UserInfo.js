export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._name = nameSelector;
        this._description = infoSelector;
      }
      getUserInfo() {
        return {
                name: this._name.textContent,
                description: this._description.textContent
                }
      }

      setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.description;
      }

    }