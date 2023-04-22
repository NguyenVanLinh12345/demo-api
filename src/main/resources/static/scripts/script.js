var api = "http://localhost:8080/danhsach/";
		let apiGet = api;
		let apiPost = api;
		let apiEdit = (index) => api + index;
		let apiDelete = (index) => api + index;

		function showAddStudent() {
			document.querySelector('.container_input').classList.remove('hidden');
		}
		function hiddenAddStudent() {
			document.querySelector('.container_input').classList.add('hidden');
		}

		function showEditRow(index) {
			showAddStudent();
			let dsTable = document.querySelector(`#row-${index}`).querySelectorAll('td');
			document.querySelector("#ten").value = dsTable[1].innerText;
			document.querySelector("#mail").value = dsTable[2].innerText;
			document.querySelector("#js-control_button").innerHTML = `
    <input class="submit" type="button" onclick="hiddenAddStudent()" value="Thoát">        
    <input class="submit" type="button" onclick="putRow(${index})" value="Chỉnh sửa sinh viên">`
		}

		function showAddRow() {
			showAddStudent()
			document.querySelector("#js-control_button").innerHTML = `
    <input class="submit" type="button" onclick="hiddenAddStudent()" value="Thoát">        
    <input class="submit" type="button" onclick="postRow()" value="Thêm sinh viên">`
		}

		function addRow(id, name, email) {
			let row = document.querySelector('#table').insertRow();
			row.setAttribute("class", "row");
			row.setAttribute("id", `row-${id}`);
			row.innerHTML = ` 
    <td >${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td><a class="link" onclick="showEditRow(${id})">Sửa</a></td>
    <td><a class="link" onclick="deleteRow(${id})">Xóa</a></td>
    `
		}

		function getSinhVien() {
			fetch(apiGet)
				.then(response => response.json())
				.then((data) => {
					for (let student of data) {
						addRow(student.id, student.name, student.email);
					}
				})
				.catch((error) => {
					console.error(error);
				})
		}
		getSinhVien();

		function callAPI(data, method, apiSend, innerFunction) {
			fetch(apiSend, {
				method: method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then((data) => {
					innerFunction(data);
				})
				.catch((error) => {
					console.error(error);
				})
		}

		function postRow() {
			let data = {
				name: document.querySelector("#ten").value,
				email: document.querySelector("#mail").value
			};
			callAPI(data, "POST", apiPost, (data) => {
				addRow(data.id, data.name, data.email);
				document.querySelector("#ten").value = "";
				document.querySelector("#mail").value = "";
				hiddenAddStudent();
			});
		}

		function putRow(index) {
			let data = {
				id: index,
				name: document.querySelector("#ten").value,
				email: document.querySelector("#mail").value
			};
			callAPI(data, "PUT", apiEdit(index), (dataResponse) => {
				let dsTable = document.querySelector(`#row-${index}`).querySelectorAll('td');
				dsTable[1].innerText = data.name;
				dsTable[2].innerText = data.email;
				document.querySelector("#ten").value = "";
				document.querySelector("#mail").value = "";
				hiddenAddStudent();
			});
		}

		function deleteRow(index) {
			if (confirm(`Ban muon xoa sinh vien co id ${index}`)) {
				callAPI(null, "DELETE", apiDelete(index), (data) => {
					document.querySelector(`#row-${index}`).remove();
				});
			}
		};