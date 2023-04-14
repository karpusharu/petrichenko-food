import {getResource} from "../services/services";

function card () {
    class MenuCard {
        constructor ({src, alt, title, description, price}, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        render(){
            const element = document.createElement('div');
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>`
            this.classes.length >= 1 ?
                this.classes.forEach(elem => element.classList.add(elem)) :
                element.classList.add('menu__item');
            this.parent.append(element);
        }
    }

    // getResource('http://localhost:3000/menu')
    //     .then(res=> res.forEach(data => new MenuCard(data, '.menu .container').render()));

    axios.get('http://localhost:3000/menu')
        .then(res=> res.data.forEach(data => new MenuCard(data, '.menu .container').render()));
}
export default card;