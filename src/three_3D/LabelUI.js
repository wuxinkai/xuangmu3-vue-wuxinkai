function LabelUI(container) {
  this.container = container;

    var div1 = document.createElement("div");
    this.container.appendChild(div1);
    div1.setAttribute('id', 'labels');
    div1.setAttribute("style", "position: absolute;color: #fff;z-index: 2;top: 0;");
  this.div1 = div1;

  this.labels = [];
}

Object.assign(LabelUI.prototype, {
  updateLabels: function(labels) {
    this.labels = labels;
  },

  createLabelUI:function(label){
    var div1 = this.div1;
      var div2 = document.createElement("div");
      div1.appendChild(div2);
      div2.setAttribute('class', 'labelItem');
    div2.setAttribute('data-pos', label.pos);
    div2.setAttribute('id', label.name);

      var div21 = document.createElement("div");
      div2.appendChild(div21);
    div21.setAttribute('class', label.className);
      div21.setAttribute("style", "position: relative;top: 0;background: rgba(38, 56, 80, 0.5);padding: 14px;width: 200px;");

      var div211 = document.createElement("div");
      div21.appendChild(div211);
      div211.setAttribute('class', "title");
    div211.innerHTML = label.title;

      var div212 = document.createElement("div");
      div21.appendChild(div212);
      div212.setAttribute('class', "content");
    div212.innerHTML = label.content;
  },

  updateLabel: function(name, pos) {
    for (var i = 0; i < this.labels.length; i++) {
      if (this.labels[i].name === name) {
        this.labels[i].pos = pos;

        for(var j = 0; j < this.div1.children.length;j++){
          if(this.div1.children[j].id === this.labels[j].name){
            this.div1.children[j].setAttribute("data-pos",this.labels[j].pos);
            return;
          }
        }
        this.createLabelUI(this.labels[i]);
      }
    }
  }
});

export {LabelUI};