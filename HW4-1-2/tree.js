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
            if(this.id === id)
                return {};

            let children = this.children;

            for(let i=0;i<children.length;++i) {
                children[i] = children[i].delete(id);
            }

            return this;
        },

        search: function search_node(id) {
            if(this.id === id)
                return this;

            let children = this.children;

            for(let i=0;i<children.length;++i) {
                let node = children[i].search(id);

                if(node !== undefined)
                    return node;
            }
        },

        print: function print_node(ctx=undefined, depth=0, offset, parentOffset=0) {
            if(ctx === undefined) {
                let space = '';

                for(let i=0;i<depth;++i)
                    space += '  ';

                console.log(space + this.id);

                let children = this.children;

                for(let i=0;i<children.length;++i) {
                    children[i].print(ctx=undefined, depth + 1);
                }
            } else {
                let width = 140;
                let height = 140;

                ctx.fillStyle = "rgb(0,255,0)";
                ctx.fillRect (width * 2 * (depth + 1), height * 2 * (offset.index + 1), width, height);

                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.font = "20px Gulim";
                ctx.fillText(this.elementName, width * 2 * (depth + 1), height * 2 * (offset.index + 1) + height / 2);

                let children = this.children;

                if(children.length === 0)
                    offset.index += 1;

                for(let i=0;i<children.length;++i) {
                    ctx.beginPath();
                    ctx.moveTo(width * 2 * (depth + 1) + width, height * 2 * (parentOffset + 1) + height / 2);
                    ctx.lineTo(width * 2 * (depth + 2), height * 2 * (offset.index + 1) + height / 2);
                    ctx.stroke();

                    children[i].print(ctx, depth + 1, offset, offset.index);
                }
            }
        },
    }
}

function create_root(id, elementName, elementAttribute) {
    let root = node(id, elementName, elementAttribute);

    return root;
}


let canvas = document.getElementById('tree');
let ctx = canvas.getContext('2d');


let root = create_root(0, 'Window', {x:0, y:0});

root.add(1, 'First Component', {x:100, y:300});
root.add(2, 'Second Component', {x:200, y:400});

root.search(1).add(3, 'Circle', {x:50, y:50, radius:5});
root.search(1).add(4, 'Rectangle', {x:50, y:50, width:100, height:100});

root.search(2).add(5, 'Square', {x:150, y:150, width:200, height:200});
root.search(2).add(6, 'Triangle', {x:250, y:250});

root.search(3).add(7, 'Point', {x:350, y:350});
root.search(4).add(8, 'Point', {x:450, y:450});
root.search(4).add(9, 'Point', {x:550, y:550});

root.print();
root.print(ctx, 0, {index: 0});