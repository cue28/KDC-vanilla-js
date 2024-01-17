import Empty from './Empty.js';

class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement('section');
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.Empty = new Empty({
      $target: $wrapper
    })

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.Empty.show(nextData);
  }

  // isElementInViewport(el) {
  //   const rect = el.getBoundingClientRect();
  //   return (
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  // }
  //
  // applyEventToElement = (items) => {
  //   document.addEventListener('scroll', () => {
  //     items.forEach((el, index) => {
  //       if (this.isElementInViewport(el) && (items.length - 1 === index)) {
  //         this.onNextPage();
  //       }
  //     });
  //   })
  // }

  listObserver = new IntersectionObserver((items, observer) => {
    items.forEach(item => {
      // 아이템이 화면에 보일 때
      if (item.isIntersecting) {
        // 이미지를 로드한다.
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;
        // 마지막 요소를 찾아낸다.
        let dataIndex = Number(item.target.dataset.index);
        // 마지막 요소라면 nextPage
        if (dataIndex === this.data.length - 1) {
          this.onNextPage();
        }
      }
    })
  });

  render() {
    if (this.data === null || this.data.length === 0) {
      this.$searchResult.style.display = 'none';
      return;
    }
    this.$searchResult.style.display = 'grid';
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src='https://via.placeholder.com/200x300' data-src=${cat.url} alt=${cat.name} />
            <div class='content'>${cat.name}</div>
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });

    // let listItems = this.$searchResult.querySelectorAll('.item');
    // this.applyEventToElement(listItems);
  }
}

export default SearchResult;