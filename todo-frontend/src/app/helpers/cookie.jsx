import Cookies from "universal-cookie";

class Cookie {
  constructor() {
    this.cookies = new Cookies();
  }
  getData(key) {
    try {
      return this.cookies.get(key);
    } catch (error) {
      console.log(error);
    }
  }
  getDataBulk(keys) {
    try {
      return keys.map((key) => this.cookies.get(key));
    } catch (error) {
      console.log(error);
    }
  }
  getAllData() {
    try {
      return this.cookies.getAll();
    } catch (error) {
      console.log(error);
    }
  }
  setData(key, data, attr) {
    try {
      this.cookies.set(key, data, attr);
    } catch (error) {
      console.log(error);
    }
  }
  setDataBulk(arrData, attr) {
    try {
      arrData.forEach(({ key, data }) => {
        this.cookies.set(key, data, attr);
      });
    } catch (error) {
      console.log(error);
    }
  }
  deleteData(key, attr) {
    try {
      this.cookies.remove(key, attr);
    } catch (error) {
      console.log(error);
    }
  }
  deleteDataBulk(keys, attr) {
    try {
      keys.forEach((key) => {
        this.cookies.remove(key, attr);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

const CookieHelper = new Cookie();

export default CookieHelper;
