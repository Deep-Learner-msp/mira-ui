const fetch_wrapper = async (
  url: string,
  method: string,
  body: any,
  notify_success: any,
  notify_failure: any,
  is_form_body = false
) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      body: is_form_body ? body : JSON.stringify(body),
      headers: is_form_body
        ? {}
        : {
            "Content-Type": "application/json",
          },
      method: method,
    })
      .then(async (res) => {
        var response_json: any = {};
        try {
          response_json = await res.json();
        } catch (err) {
          throw err;
        }
        if (!res.ok) {
          throw response_json;
        } else {
          if (response_json && response_json.success !== true) {
            throw response_json.error;
          } else {
            return response_json.result;
            0;
          }
        }
      })
      .then((d) => {
        if (notify_success) {
        }
        resolve(d);
      })
      .catch((e) => {
        if (notify_failure) {
          console.log("Failure", e);
        }
        reject({
          code: (e && e.code) || "Not available",
          message: (e && e.message) || "Not available",
        });
      });
  });
};

export default fetch_wrapper;
