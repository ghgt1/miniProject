const inputForm = document.querySelector(".grocery-form");
const inputData = document.querySelector(".grocery-input");
const groceryLists = document.querySelector(".grocery-lists");
const clearBtn = document.querySelector(".clear-btn");

renderItems();

// 재료 추가 CREATE, 그리고 렌더링도 같이(순서유지)!!
// preventdefault로 submit시 리로드 막기
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const time = new Date().getTime().toString();
  addContext(time, inputData.value);
  window.localStorage.setItem(time, inputData.value);
  inputData.value = null;
});

clearBtn.addEventListener("click", deleteGrocery);

function addContext(key, val) {
  clearBtn.classList.add("show");
  const grocerySection = document.createElement("div");
  grocerySection.id = key;
  grocerySection.classList.add("groceries");
  grocerySection.innerHTML = /* html */ `
		<p class="title">${val}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
				<i class="fa-solid fa-pen-to-square"></i>
      </button>
      <button type="button" class="delete-btn">
			<i class="fa-solid fa-trash"></i>
      </button>
    </div>
	`;
  groceryLists.append(grocerySection);
}

// 결국 렌더링은 이 함수가함. submit 이벤트리스너는 하나씩 실시간으로 넣어주는 역할
function renderItems() {
  // 시간순서 sort
  groceryLists.innerHTML = "";
  const sortedStorage = Object.keys(window.localStorage)
    .sort()
    .reduce((acc, key) => {
      acc[key] = window.localStorage[key];
      return acc;
    }, {});
  console.log(sortedStorage);
  for (let key in sortedStorage) {
    addContext(key, sortedStorage[key]);
  }
  if (window.localStorage.length !== 0) {
    clearBtn.classList.add("hidden");
    clearBtn.classList.add("show");
  } else {
    clearBtn.classList.remove("show");
    clearBtn.classList.add("hidden");
  }
}

// Delete all
function deleteGrocery() {
  window.localStorage.clear();
  renderItems();
  clearBtn.classList.remove("show");
  clearBtn.classList.add("hidden");
}
