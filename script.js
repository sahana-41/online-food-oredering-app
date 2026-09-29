
const STORAGE_KEY = "deliveryAddresses";

let addresses = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

let selectedId = addresses.find(a => a.isDefault)?.id || null;
let editingId = null;

const addressList = document.getElementById("addressList");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const form = document.getElementById("addressForm");
const selectedAddress = document.getElementById("selectedAddress");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const fields = [
  "label", "fullName", "phone", "house",
  "street", "city", "state", "pincode"
];

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function renderAddresses() {
  addressList.innerHTML = "";

  emptyState.style.display =
    addresses.length === 0 ? "block" : "none";

  addresses.forEach(address => {
    const card = document.createElement("div");
    card.className = "address-card" +
      (selectedId === address.id ? " selected" : "");

    card.innerHTML = `
      <div class="card-top">
        <input type="radio" name="deliveryAddress"
          ${selectedId === address.id ? "checked" : ""}
          aria-label="Select ${escapeHTML(address.label)} address">

        <div class="address-info">
          <div>
            <span class="address-type">
              ${escapeHTML(address.label)}
            </span>
            ${address.isDefault
              ? '<span class="badge">Default</span>'
              : ""}
          </div>

          <p class="name">${escapeHTML(address.fullName)}</p>
          <p>
            ${escapeHTML(address.house)},
            ${escapeHTML(address.street)}<br>
            ${escapeHTML(address.city)},
            ${escapeHTML(address.state)} -
            ${escapeHTML(address.pincode)}
          </p>
          <p>Phone: ${escapeHTML(address.phone)}</p>
        </div>
      </div>

      <div class="card-actions">
        <button class="edit-btn" data-action="edit">Edit</button>
        <button class="delete-btn" data-action="delete">Delete</button>
        ${!address.isDefault
          ? '<button class="default-btn" data-action="default">Set as default</button>'
          : ""}
      </div>
    `;

    card.addEventListener("click", event => {
      const action = event.target.dataset.action;

      if (action === "edit") {
        event.stopPropagation();
        editAddress(address.id);
      } else if (action === "delete") {
        event.stopPropagation();
        deleteAddress(address.id);
      } else if (action === "default") {
        event.stopPropagation();
        setDefault(address.id);
      } else {
        selectedId = address.id;
        renderAddresses();
      }
    });

    addressList.appendChild(card);
  });

  renderCheckout();
}

function renderCheckout() {
  const address = addresses.find(a => a.id === selectedId);

  if (!address) {
    selectedAddress.textContent = "No address selected";
    placeOrderBtn.disabled = true;
    return;
  }

  selectedAddress.innerHTML = `
    <strong>${escapeHTML(address.fullName)}</strong><br>
    ${escapeHTML(address.house)},
    ${escapeHTML(address.street)}<br>
    ${escapeHTML(address.city)},
    ${escapeHTML(address.state)} -
    ${escapeHTML(address.pincode)}<br>
    Phone: ${escapeHTML(address.phone)}
  `;

  placeOrderBtn.disabled = false;
}

function openModal(address = null) {
  form.reset();
  editingId = address ? address.id : null;

  document.getElementById("formTitle").textContent =
    address ? "Edit Address" : "Add New Address";

  document.getElementById("saveBtn").textContent =
    address ? "Update Address" : "Save Address";

  if (address) {
    fields.forEach(field => {
      document.getElementById(field).value = address[field];
    });

    document.getElementById("isDefault").checked =
      address.isDefault;
  }

  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  form.reset();
  editingId = null;
}

function editAddress(id) {
  const address = addresses.find(a => a.id === id);
  if (address) openModal(address);
}

function deleteAddress(id) {
  if (!confirm("Are you sure you want to delete this address?")) {
    return;
  }

  const wasDefault = addresses.find(a => a.id === id)?.isDefault;

  addresses = addresses.filter(a => a.id !== id);

  if (selectedId === id) {
    selectedId = addresses.find(a => a.isDefault)?.id ||
      addresses[0]?.id || null;
  }

  if (wasDefault && addresses.length) {
    addresses[0].isDefault = true;
  }

  saveToStorage();
  renderAddresses();
}

function setDefault(id) {
  addresses = addresses.map(address => ({
    ...address,
    isDefault: address.id === id
  }));

  selectedId = id;
  saveToStorage();
  renderAddresses();
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const data = {};
  fields.forEach(field => {
    data[field] = document.getElementById(field).value.trim();
  });

  if (!/^[0-9]{10}$/.test(data.phone)) {
    alert("Enter a valid 10-digit phone number.");
    return;
  }

  if (!/^[0-9]{6}$/.test(data.pincode)) {
    alert("Enter a valid 6-digit PIN code.");
    return;
  }

  const isDefault = document.getElementById("isDefault").checked;

  if (editingId) {
    addresses = addresses.map(address =>
      address.id === editingId
        ? { ...address, ...data, isDefault }
        : address
    );
  } else {
    if (addresses.length >= 10) {
      alert("You can save up to 10 addresses.");
      return;
    }

    const newAddress = {
      id: crypto.randomUUID(),
      ...data,
      isDefault: isDefault || addresses.length === 0
    };

    addresses.push(newAddress);
    selectedId = newAddress.id;
  }

  if (isDefault) {
    const currentId = editingId ||
      addresses[addresses.length - 1].id;

    addresses = addresses.map(address => ({
      ...address,
      isDefault: address.id === currentId
    }));
    selectedId = currentId;
  }

  if (!selectedId) {
    selectedId = addresses[0]?.id || null;
  }

  saveToStorage();
  renderAddresses();
  closeModal();
});

document.getElementById("addBtn").addEventListener("click", () => {
  if (addresses.length >= 10) {
    alert("You can save up to 10 addresses.");
    return;
  }
  openModal();
});

document.getElementById("emptyAddBtn").addEventListener("click", () => {
  openModal();
});

document.getElementById("closeBtn").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

placeOrderBtn.addEventListener("click", () => {
  const address = addresses.find(a => a.id === selectedId);

  if (!address) return;

  document.getElementById("checkoutMessage").textContent =
    `Delivery address selected: ${address.label}. Ready for payment.`;
});

renderAddresses();