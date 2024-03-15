function validateForm() {
  var name = document.getElementById("firstName").value;
  var surname = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (surname == "") {
    alert("Surname is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email");
    return false;
  }
  return true;
}
function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  var html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.surname + "</td>";
    html += "<td>" + element.email + "</td>";
    // Отображаем изображение, если ссылка на него есть
    if (element.image) {
      html +=
        "<td><img src='" +
        element.image +
        "' style='max-width: 300px;' /></td>";
    } else {
      html += "<td>No image</td>";
    }
    html +=
      '<td><button onclick="deleteData(' +
      index +
      ')"class = "btn btn-danger">Delete</button><button  onclick = "updateData(' +
      index +
      ')"class = "btn btn-warning m-2">Update</button></td>';

    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", showData);
function AddData() {
  if (validateForm() == true) {
    var name = document.getElementById("firstName").value;
    var surname = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var image = ""; // Сюда будет сохранена ссылка на изображение

    // Получаем файл из input[type=file]
    var fileInput = document.getElementById("image");
    var file = fileInput.files[0];

    if (file) {
      // Создаем объект FileReader для чтения содержимого файла
      var reader = new FileReader();
      reader.onload = function (e) {
        // После загрузки файла обновляем изображение и сохраняем ссылку на него
        image = e.target.result;

        // Сохраняем данные в хранилище
        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
          peopleList = [];
        } else {
          peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
          name: name,
          surname: surname,
          email: email,
          image: image, // Сохраняем ссылку на изображение
        });
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        // Очищаем значения полей
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("imagePreview").style.display = "none";
      };
      // Читаем содержимое файла как URL-адрес данных
      reader.readAsDataURL(file);
    } else {
      // Если файл не выбран, сохраняем данные без изображения
      var peopleList;
      if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
      } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }
      peopleList.push({
        name: name,
        surname: surname,
        email: email,
        image: "", // Сохраняем пустую строку для ссылки на изображение
      });
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      // Очищаем значения полей
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("imagePreview").style.display = "none";
    }
  }
}

function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("firstName").value = peopleList[index].name;
  document.getElementById("lastName").value = peopleList[index].surname;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm() == true) {
      peopleList[index].name = document.getElementById("firstName").value;
      peopleList[index].surname = document.getElementById("lastName").value;

      peopleList[index].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}

function reloadPage() {
  location.reload();
}
