export default class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  iterateThroughNodes(cb) {
    const arr = this.array;
    for(let i = 0; i < arr.length; i++) {
      cb(arr[i]);
    }
  }

  html(str) {
    if (str === undefined) {
      return this.array[0].innerHTML;
    } else {
        this.iterateThroughNodes(function(elem) {
          elem.innerHTML = str;
        });
    }
  }

  empty() {
    this.iterateThroughNodes(function(elem) {
      elem.innerHTML = '';
    });
  }

  append(arg) {
    this.iterateThroughNodes(function(elem) {
      if (typeof arg == 'string') {
        elem.innerHTML = elem.innerHTML + arg;
      }
    });
  }

  attr(att) {
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        node.attributes[Object.keys(att)[0]] = att[Object.keys(att)[0]];
      }
    }

    addClass(name) {
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        if(node.class === undefined){
          node.class = name;
        } else {
          node.class += ' ' + name;
        }
      }
    }

    removeClass(name) {
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        let classArr = node.class.split(' ');
        if(classArr.includes(name)) {
          let idx = classArr.indexOf(name);
          classArr = classArr.slice(0, idx).concat(classArr.slice(idx+1));
          node.class = classArr.join(" ");
        }
      }
    }

    children() {
      const childNodes = [];

      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        if (node.children.length === 0) {
          childNodes.push(node);
          continue;
        }
        childNodes.push(node.children);
      }
      return new DOMNodeCollection(childNodes);
    }

    parent() {
      const parentNodes = [];
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        if (node.parentElement.length === 0) {
          parentNodes.push(node);
          continue;
        }
        parentNodes.push(node.parentElement);
      }
      return new DOMNodeCollection(parentNodes);
    }

    find(selector) {
      let selectedNodes = [];
      const children = this.children();
      let selectedItems;

      for ( let i = 0; i < children.nodes.length; i++ ) {
        let child = Array.from(children.nodes[i]);
        selectedItems = child.filter(el => el.localName === selector);
        selectedNodes = selectedNodes.concat(selectedItems);
      }
      return new DOMNodeCollection(selectedNodes);
    }

    remove() {
      for(let i = 0; i < this.nodes.length; i++) {
        let node = this.nodes[i];
        node.outerHTML = "";
      }
      this.nodes = [];
    }

    on(type, callback) {
      for ( let i = 0; i < this.nodes.length; i++ ) {
        let node = this.nodes[i];
        node.attributes[type] = callback;
        const listener = node.addEventListener(type, callback);
      }
    }

    off(type){
      for ( let i = 0; i < this.nodes.length; i++ ) {
        let node = this.nodes[i];
        const callback = node.attributes[type];
        const listener = node.removeEventListener(type, callback);
      }
    }

  }
