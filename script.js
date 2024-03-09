let myChart = document.getElementById("myChart").getContext("2d");
let popChart = new Chart(myChart, {
  type: "bar",
  data: {
    labels: [
      "Feb 1",
      "Feb 2",
      "Feb 3",
      "Feb 4",
      "Feb 5",
      "Feb 6",
      "Feb 7",
      "Feb 8",
      "Feb 9",
      "Feb 10",
      "Feb 11",
    ],
    datasets: [
      {
        label: "Sales Details",
        data: [
          15000, 20000, 13310, 12324, 13338, 18600, 55000, 44000, 56000, 10000,
          77000,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 0, 0)",
          "rgb(0, 255, 0)",
          "rgb(0, 0, 255)",
          "rgb(255, 255, 0)",
          "rgb(255, 0, 255)",
        ],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Sales Detail",
      fontSize: 20,
    },

    legend: {
      display: true,
      labels: {
        fontColor: "#000",
      },
    },
  },
  tooltips: {
    enabled: true,
  },
});

const sideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

sideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    sideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

let newId = 4;
const newCategory = { name: null, id: newId, image: null };

document.getElementById("add-test").addEventListener("click", function () {
  document.querySelector(".form-wrapper").classList.remove("hidden");
});

document.getElementById("test-result").addEventListener("keyup", function () {
  newCategory.image = this.value;
});

document.getElementById("test-name").addEventListener("change", function () {
  newCategory.name = this.value;
});

document.getElementById("create-test").addEventListener("click", function () {
  const categoryName = document.getElementById("test-name").value.trim();
  if (!categoryName) {
    return;
  }

  newCategory.name = categoryName;
  addRow(newCategory);
  document.getElementById("test-name").value = "";
  document.getElementById("test-result").value = "";
  document.querySelector(".form-wrapper").classList.add("hidden");

  addCategory(newCategory.name, newCategory.image);
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTcwOTg4MDQxNSwiZXhwIjoxNzEyNDcyNDE1fQ.QEF_kmLqtBs21l9r0ROCGOAI6Yc6Kd1QkE_cvk3LYzM";
async function fetchCategories() {
  try {
    const response = await fetch("https://codynn.com/bikerszone/api/category");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function addCategory(name, image) {
  try {
    const response = await fetch("https://codynn.com/bikerszone/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ category_name: name, image }),
    });
    if (!response.ok) {
      throw new Error("Failed to add category");
    }
    const category = await response.json();
    return category;
  } catch (error) {
    console.error("Error adding category:", error);
    return null;
  }
}

async function deleteCategory(id) {
  try {
    const response = await fetch(
      `https://codynn.com/bikerszone/api/category/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    return false;
  }
}

async function populateCategories() {
  const categories = await fetchCategories();
  categories.forEach((category) => addRow(category));
}

function addRow(category) {
  const testsTable = document.getElementById("tests-table");
  const row = document.createElement("tr");
  row.id = `test-row-${category.id}`;
  row.innerHTML = `
    <td>${category.category_name}</td>
    <td><img src="${category.image}" alt="${category.category_name}" style="max-width: 100px;"></td>
    <td>
      <button class="delete-btn"><i class='bx bxs-trash' ></i></button>
    </td>
  `;
  testsTable.appendChild(row);


  const deleteBtn = row.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", () => deleteRow(row));

}


async function deleteRow(row) {
  const categoryId = row.id.split("-")[2];
  const success = await deleteCategory(categoryId);
  if (success) {
    row.remove();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
});

async function fetchProducts() {
  try {
    const response = await fetch("https://codynn.com/bikerszone/api/product");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const responseData = await response.json();
    const products = responseData.products;
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function addProduct(product) {
  try {
    const response = await fetch("https://codynn.com/bikerszone/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name: product.name,
        product_price: parseFloat(product.price),
        product_description: product.description,
        product_images: [product.image],
        category_id: parseInt(product.category),
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    const addedProduct = await response.json();
    addProductRow(addedProduct);
    return addedProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    return null;
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(
      `https://codynn.com/bikerszone/api/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}

async function addProductRow(product) {
  const productsTable = document.getElementById("prods-table");
  const prodRow = document.createElement("tr");
  prodRow.id = `product-row-${product.id}`;
  prodRow.innerHTML = `
    <td>${product.product_name}</td>
    <td>${product.category.category_name}</td>
    <td>RS ${product.product_price}</td>
    <td>${product.product_description}</td>
    <td><img src="${product.images[0].url}" alt="${product.product_name}" style="max-width: 100px;"></td>
    <td>
    <button class="edit-prod-btn"><i class="bx bx-edit-alt"></i></button>
      <button class="save-prod-btn prod-hidden"><i class="bx bx-save"></i></button>
           <button class="delete-prod-btn"><i class="bx bxs-trash"></i></button>
           <button class="cancel-prod-btn prod-hidden"><i class="bx bx-window-close"></i></button>
    </td>
  `;
  productsTable.appendChild(prodRow);

  async function getCategoryName() {
    try {
      const response = await fetch('https://codynn.com/bikerszone/api/category');
      const categories = await response.json();

      document.getElementById('choose-cat').innerHTML = '';

      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.category_name;
        document.getElementById('choose-cat').appendChild(option);
      });
    } catch(error) {
      console.error(error);
    }
  }
  getCategoryName();

  const editProdBtn = prodRow.querySelector(".edit-prod-btn");
  const saveProdBtn = prodRow.querySelector(".save-prod-btn");
  const deleteProdBtn = prodRow.querySelector(".delete-prod-btn");
  const cancelProdBtn = prodRow.querySelector(".cancel-prod-btn");

  const nameProdSpan = prodRow.querySelector("td:first-child");
  const categoryProdSpan = prodRow.querySelector("td:nth-child(2)");
  const priceProdSpan = prodRow.querySelector("td:nth-child(3)");
  const descriptionProdSpan = prodRow.querySelector("td:nth-child(4)");
  const imageProdSpan = prodRow.querySelector("td:nth-child(5)");

  editProdBtn.addEventListener("click", () =>
    editProductRow(
      prodRow,
      nameProdSpan,
      categoryProdSpan,
      priceProdSpan,
      descriptionProdSpan,
      imageProdSpan
    )
  );
  saveProdBtn.addEventListener("click", () =>
    saveProductRow(
      prodRow,
      nameProdSpan,
      categoryProdSpan,
      priceProdSpan,
      descriptionProdSpan,
      imageProdSpan
    )
  );
  deleteProdBtn.addEventListener("click", () => deleteProductRow(prodRow));
  cancelProdBtn.addEventListener("click", () =>
    cancelEditProductRow(
      prodRow,
      nameProdSpan,
      categoryProdSpan,
      priceProdSpan,
      descriptionProdSpan,
      imageProdSpan
    )
  );
}

function editProductRow(row, nameSpan, categorySpan, priceSpan, descriptionSpan, imageSpan) {
  row.classList.add("editing");
  nameSpan.contentEditable = true;
  categorySpan.contentEditable = true;
  priceSpan.contentEditable = true;
  descriptionSpan.contentEditable = true;
  imageSpan.contentEditable = true;
  row.querySelector(".edit-prod-btn").classList.add("prod-hidden");
  row.querySelector(".save-prod-btn").classList.remove("prod-hidden");
  row.querySelector(".delete-prod-btn").classList.add("prod-hidden");
  row.querySelector(".cancel-prod-btn").classList.remove("prod-hidden");
}

async function saveProductRow(row, nameSpan, categorySpan, priceSpan, descriptionSpan, imageSpan) {
  const productId = row.id.split("-")[2];
  const productName = nameSpan.innerText.trim();
  const productCategory = categorySpan.innerText.trim();
  const productPrice = priceSpan.innerText.trim();
  const productDescription = descriptionSpan.innerText.trim();
  const productImage = imageSpan.querySelector("img").src;

  try {
    const response = await fetch(
      `https://codynn.com/bikerszone/api/product/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_name: productName,
          product_price: parseFloat(productPrice),
          product_description: productDescription,
          product_images: [productImage],
          category_id: parseInt(productCategory),
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update product");
    }

  } catch (error) {
    console.error("Error updating product:", error);
  }

  row.classList.remove("editing");
  nameSpan.contentEditable = false;
  categorySpan.contentEditable = false;
  priceSpan.contentEditable = false;
  descriptionSpan.contentEditable = false;
  imageSpan.contentEditable = false;
  row.querySelector(".edit-prod-btn").classList.remove("prod-hidden");
  row.querySelector(".save-prod-btn").classList.add("prod-hidden");
  row.querySelector(".delete-prod-btn").classList.remove("prod-hidden");
  row.querySelector(".cancel-prod-btn").classList.add("prod-hidden");
}

async function deleteProductRow(row) {
  const productId = row.id.split("-")[2];
  try {
    const response = await fetch(
      `https://codynn.com/bikerszone/api/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
    row.remove(); 
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

function cancelEditProductRow(row, nameSpan, categorySpan, priceSpan, descriptionSpan, imageSpan) {
  row.classList.remove("editing");
  nameSpan.contentEditable = false;
  categorySpan.contentEditable = false;
  priceSpan.contentEditable = false;
  descriptionSpan.contentEditable = false;
  imageSpan.contentEditable = false;
  row.querySelector(".edit-prod-btn").classList.remove("prod-hidden");
  row.querySelector(".save-prod-btn").classList.add("prod-hidden");
  row.querySelector(".delete-prod-btn").classList.remove("prod-hidden");
  row.querySelector(".cancel-prod-btn").classList.add("prod-hidden");
}

document.getElementById("add-prod").addEventListener("click", function () {
  document.querySelector(".prod-form-wrap").classList.remove("prod-hidden");
});

document.getElementById("create-prod").addEventListener("click", async function () {
  const newProductId = 1; 
  const newProduct = {
    name: document.getElementById("prod-name").value,
    category: document.getElementById("choose-cat").value,
    price: document.getElementById("prod-price").value,
    description: document.getElementById("prod-desc").value,
    image: document.getElementById("prod-img").value,
    id: newProductId,
  };

  if (
    !newProduct.name ||
    !newProduct.category ||
    !newProduct.price ||
    !newProduct.description ||
    !newProduct.image
  ) {
    return;
  }

  await addProduct(newProduct);

  document.getElementById("prod-name").value = "";
  document.getElementById("choose-cat").value = "";
  document.getElementById("prod-price").value = "";
  document.getElementById("prod-desc").value = "";
  document.getElementById("prod-img").value = "";
  document.querySelector(".prod-form-wrap").classList.add("prod-hidden");
});

populateProducts();

async function populateProducts() {
  try {
    const products = await fetchProducts();
    products.forEach((product) => addProductRow(product));
  } catch (error) {
    console.error("Error populating products:", error);
  }
}