// Portfolio Contact Form
        document.getElementById("contactForm").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Message sent successfully!");
        });

        // Todo App
        const taskInput = document.getElementById("taskInput");
        const addTaskBtn = document.getElementById("addTaskBtn");
        const taskList = document.getElementById("taskList");

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(taskText => addTask(taskText));
        }

        function saveTasks() {
            const tasks = [];
            document.querySelectorAll("#taskList li span").forEach(item => {
                tasks.push(item.textContent);
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function addTask(taskText) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${taskText}</span>
                            <button class="deleteBtn">X</button>`;
            taskList.appendChild(li);

            li.querySelector(".deleteBtn").addEventListener("click", () => {
                li.remove();
                saveTasks();
            });
        }

        addTaskBtn.addEventListener("click", () => {
            if (taskInput.value.trim()) {
                addTask(taskInput.value.trim());
                saveTasks();
                taskInput.value = "";
            }
        });

        window.onload = loadTasks;

        // Product Listing
        const products = [{
            name: "Laptop",
            category: "electronics",
            price: 800
        }, {
            name: "Shirt",
            category: "clothing",
            price: 40
        }, {
            name: "Smartphone",
            category: "electronics",
            price: 600
        }, {
            name: "Jeans",
            category: "clothing",
            price: 60
        }];

        const productList = document.getElementById("productList");
        const categoryFilter = document.getElementById("categoryFilter");
        const sortPrice = document.getElementById("sortPrice");

        function displayProducts(items) {
            productList.innerHTML = "";
            items.forEach(p => {
                const div = document.createElement("div");
                div.className = "product-card";
                div.innerHTML = `<h3>${p.name}</h3><p>Category: ${p.category}</p><p>Price: $${p.price}</p>`;
                productList.appendChild(div);
            });
        }

        function filterAndSort() {
            let filtered = [...products];
            if (categoryFilter.value !== "all") {
                filtered = filtered.filter(p => p.category === categoryFilter.value);
            }
            filtered.sort((a, b) => sortPrice.value === "asc" ? a.price - b.price : b.price - a.price);
            displayProducts(filtered);
        }

        categoryFilter.addEventListener("change", filterAndSort);
        sortPrice.addEventListener("change", filterAndSort);

        filterAndSort(); // initial display

