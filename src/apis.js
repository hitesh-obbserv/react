import { toast } from "react-toastify";
import React from "react";

function request(path, { data = null, token = null, method = "GET" }) {
  return fetch(path, {
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
  })
    .then((response) => {
      //if it is success
      if (response.ok) {
        if (method === "DELETE") {
          return true;
        }
        return response.json();
      }
      return response
        .json()
        .then((json) => {
          //
          if (response.status === 400) {
            const errors = Object.keys(json).map((k) => `${json[k].join(" ")}`);
            throw new Error(errors.join(" "));
          }
          throw new Error(JSON.stringify(json));
        })
        .catch((evt) => {
          if (evt.name === "SyntaxError") {
            throw new Error(response.statusText);
          }
          throw new Error(evt);
        });
    })
    .catch((evt) => {
      toast(evt.message, <option value="error" />);
    });
}

export function signIn(username, password) {
  return request("/api/user", {
    data: { email: username, password: password },
    method: "POST",
  });
}

export function register(username, password) {
  return request("/auth/users/", {
    data: { username, password },
    method: "POST",
  });
}
export function validate(token) {
  return request("/api/token/validate", { token, method: "POST" });
}

export function fetchPlaces(token) {
  return request("/api/clients", { token });
}
export function addPlace(data, token) {
  return request("/api/create", { data, token, method: "POST" });
}
