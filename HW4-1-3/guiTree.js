function node(id, elementName, elementAttribute) {
    return {
        id,
        elementName,
        elementAttribute,
        children: [],

        add: function add_node(id, elementName, elementAttribute) {
            let newNode = node(id, elementName, elementAttribute);
            this.children.push(newNode);
        },

        delete: function delete_node(id) {
            if (this.id === id)
                return {};

            let children = this.children;

            for (let i = 0; i < children.length; ++i) {
                children[i] = children[i].delete(id);
            }

            return this;
        },

        search: function search_node(id) {
            if (this.id === id)
                return this;

            let children = this.children;

            for (let i = 0; i < children.length; ++i) {
                let node = children[i].search(id);

                if (node !== undefined)
                    return node;
            }
        },

        print: function print_node(ctx = undefined, depth = 0) {
            if (ctx === undefined) {
                let space = '';

                for (let i = 0; i < depth; ++i)
                    space += '  ';

                console.log(space + this.id);

                let children = this.children;

                for (let i = 0; i < children.length; ++i) {
                    children[i].print(ctx = undefined, depth + 1);
                }
            } else {
                let elementName = this.elementName;

                if (elementName === 'Circle') {
                    let {x, y, radius} = this.elementAttribute;

                    ctx.beginPath();
                    ctx.rect(x - radius, y - radius, 2 * radius, 2 * radius);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#000000";
                    ctx.setLineDash([8, 4]);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "#000000";
                    ctx.setLineDash([0, 0]);
                    ctx.stroke();
                } else if (elementName === 'Triangle') {
                    let {x, y, width, height} = this.elementAttribute;

                    ctx.beginPath();
                    ctx.rect(x, y, width, height);
                    ctx.lineWidth = 3;
                    ctx.strokeStyle = "#000000";
                    ctx.setLineDash([8, 4]);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(x, y + height);
                    ctx.lineTo(x + width / 2, y);
                    ctx.lineTo(x + width, y + height);
                    ctx.closePath();
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "#000000";
                    ctx.setLineDash([0, 0]);
                    ctx.stroke();
                } else if (elementName === 'Rectangle') {
                    let {x, y, width, height} = this.elementAttribute;

                    ctx.beginPath();
                    ctx.rect(x, y, width, height);
                    ctx.lineWidth = 5;
                    ctx.strokeStyle = "#000000";
                    ctx.setLineDash([0, 0]);
                    ctx.stroke();
                }

                let children = this.children;

                for (let i = 0; i < children.length; ++i) {
                    children[i].print(ctx, depth + 1);
                }
            }
        },
    }
}

function create_root(id, elementName, elementAttribute) {
    let root = node(id, elementName, elementAttribute);

    return root;
}

function clickEvent(event) {
    console.log(event.clientX);
    console.log(event.clientY);

    let x = event.pageX;
    let y = event.pageY;

    let id = searchObject(root, x, y);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    root.print(ctx, 0);

    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "20px Gulim";
    ctx.fillText(id + ' is clicked', 500, 500);
}

function searchObject(root, posX, posY) {
    for (let i = 0; i < root.children.length; ++i) {
        let result = searchObject(root.children[i], posX, posY);

        if (result !== undefined)
            return result;
    }

    let elementName = root.elementName;

    if (elementName === 'Circle') {
        let {x, y, radius} = root.elementAttribute;

        if(posX >= x - radius && posX <= x + radius && posY >= y - radius && posY <= y + radius)
            return root.elementName + '-' + root.id;
    } else if (elementName === 'Triangle') {
        let {x, y, width, height} = root.elementAttribute;

        if(posX >= x && posX <= x + width && posY >= y && posY <= y + height)
            return root.elementName + '-' + root.id;
    } else if (elementName === 'Rectangle') {
        let {x, y, width, height} = root.elementAttribute;

        if(posX >= x && posX <= x + width && posY >= y && posY <= y + height)
            return root.elementName + '-' + root.id;
    }
}

let canvas = document.getElementById('guiTree');
let ctx = canvas.getContext('2d');

canvas.addEventListener("click", clickEvent, false);

let root = create_root(0, 'Rectangle', {x: 100, y: 100, width: 1000, height: 1000});

root.add(1, 'Rectangle', {x: 150, y: 600, width: 400, height: 400});
root.add(2, 'Rectangle', {x: 650, y: 400, width: 400, height: 400});

root.search(1).add(3, 'Circle', {x: 400, y: 750, radius: 100});

root.search(2).add(5, 'Triangle', {x: 700, y: 650, width: 100, height: 100});
root.search(2).add(6, 'Circle', {x: 900, y: 550, radius: 100});

root.search(6).add(7, 'Triangle', {x: 900, y: 500, width: 50, height: 50});

root.print();
root.print(ctx, 0);

