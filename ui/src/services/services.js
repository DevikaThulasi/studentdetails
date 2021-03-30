import http from "../http-common"
class StudentService {
  getAll() {
    return http.get("/students");

  }
  create(data) {
    alert("message")
    return http.post("/students", data);
  }

  update(id, data) {
    return http.put(`/students/${id}`, data);
  }

  get(id) {
    return http.get(`/students/${id}`);
  }

}
export default new StudentService();