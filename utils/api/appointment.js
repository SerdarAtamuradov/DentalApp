import axios from "../../core/axios";

export default {
  get: () => axios.get("/appointments"),
  remove: (id) => axios.delete("/appointments/" + id),
  add: (values) => axios.post("/appointments", values),
  show: (id) => axios.get("/appointments/" + id),
  update: (id, values) => axios.patch("/appointments/" + id, values),
};
