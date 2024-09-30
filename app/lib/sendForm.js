const BASE_URL = "https://66f83fba2a683ce9730f0c34.mockapi.io";

export default async function sendForm() {
  const form = event.target;
  const formValues = Object.fromEntries(new FormData(form).entries());

  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formValues),
  });

  try {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    form.reset();

    return res;
  } catch (error) {
    return (error);
  }
}
