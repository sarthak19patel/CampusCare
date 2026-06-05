async function loadMyRequests() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || !user.email) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(
    `http://localhost:5000/api/requests/user/${user.email}`
  );

  const requests = await response.json();

  const table = document.getElementById("myRequestsTable");
  table.innerHTML = "";
  document.getElementById("totalMyRequests").textContent = requests.length;

document.getElementById("resolvedMyRequests").textContent =
  requests.filter(r => r.status === "Resolved").length;

document.getElementById("otherMyRequests").textContent =
  requests.filter(r => r.status !== "Resolved").length;
  requests.forEach((request) => {
    table.innerHTML += `
      <tr class="border-b">
        <td class="p-3 font-semibold">${request.category}</td>
        <td class="p-3">${request.message}</td>
        <td class="p-3">
          <span class="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-700">
            ${request.status}
          </span>
        </td>
        <td class="p-3">${new Date(request.createdAt).toLocaleString()}</td>
      </tr>
    `;
  });
}

loadMyRequests();