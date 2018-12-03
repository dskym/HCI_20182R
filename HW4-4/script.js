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

let canvas = document.getElementById('final');
let ctx = canvas.getContext('2d');

canvas.addEventListener("click", clickEvent, false);

let root = create_root(0, 'Rectangle', {x: 100, y: 100, width: 300, height: 600});

root.add(1, 'Rectangle', {x: 100, y: 100, width: 300, height: 80});
root.add(2, 'Rectangle', {x: 100, y: 180, width: 300, height: 440});
root.add(3, 'Rectangle', {x: 100, y: 620, width: 300, height: 80});

root.search(1).add(4, 'Rectangle', {x: 120, y: 120, width: 40, height: 40});
root.search(1).add(5, 'Rectangle', {x: 180, y: 120, width: 200, height: 40});

root.search(2).add(8, 'Rectangle', {x: 110, y: 210, width: 80, height: 80});
root.search(2).add(9, 'Rectangle', {x: 210, y: 210, width: 80, height: 80});
root.search(2).add(10, 'Rectangle', {x: 310, y: 210, width: 80, height: 80});

root.search(2).add(11, 'Rectangle', {x: 110, y: 310, width: 80, height: 80});
root.search(2).add(12, 'Rectangle', {x: 210, y: 310, width: 80, height: 80});
root.search(2).add(13, 'Rectangle', {x: 310, y: 310, width: 80, height: 80});

root.search(2).add(14, 'Rectangle', {x: 110, y: 410, width: 80, height: 80});
root.search(2).add(15, 'Rectangle', {x: 210, y: 410, width: 80, height: 80});
root.search(2).add(16, 'Rectangle', {x: 310, y: 410, width: 80, height: 80});

root.search(2).add(17, 'Rectangle', {x: 110, y: 510, width: 80, height: 80});
root.search(2).add(18, 'Rectangle', {x: 210, y: 510, width: 80, height: 80});
root.search(2).add(19, 'Rectangle', {x: 310, y: 510, width: 80, height: 80});

root.search(3).add(6, 'Rectangle', {x: 120, y: 640, width: 120, height: 40});
root.search(3).add(7, 'Rectangle', {x: 260, y: 640, width: 120, height: 40});

root.print(ctx, 0);
