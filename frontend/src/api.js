import axios from "axios";

const API = axios.create({
  baseURL: "https://candidate-shortlisting.onrender.com/api",
});

export const addCandidate = (data) => API.post("/candidates", data);
export const getCandidates = () => API.get("/candidates");
export const deleteCandidate = (id) => API.delete(`/candidates/${id}`);
export const matchCandidates = (data) => API.post("/match", data);
export const aiShortlist = (data) => API.post("/ai/shortlist", data);
