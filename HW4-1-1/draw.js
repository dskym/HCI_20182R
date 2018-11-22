function create_window(id, position_x, position_y, width, height, title) {
    let canvas = document.getElementById('draw');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x, position_y, width, height * 0.2);

    ctx.fillStyle = "rgb(30,180,190)";
    ctx.fillRect(position_x, position_y, width, height * 0.2);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x, position_y + height * 0.2, width, height * 0.8);

    ctx.fillStyle = "rgb(30,180,190)";
    ctx.fillRect(position_x, position_y + height * 0.2, width, height * 0.8);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "20px Gulim";
    ctx.fillText(title, position_x, position_y + height * 0.1);

    let size = 20;

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x + width - size * 2, position_y + height - size, size, size);
    ctx.fillText('X', position_x + width - size * 2, position_y + height);

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x + width - size, position_y + height - size, size, size);
    ctx.fillText('-', position_x + width - size, position_y + height);
}

function create_textbox(id, position_x, position_y, width, height, title) {
    let canvas = document.getElementById('draw');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x, position_y, width, height);

    ctx.fillStyle = "rgb(30,180,190)";
    ctx.fillRect(position_x, position_y, width, height);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "20px Gulim";
    ctx.fillText(title, position_x, position_y + height / 2);
}

function create_button(id, position_x, position_y, width, height, title) {
    let canvas = document.getElementById('draw');
    let ctx = canvas.getContext('2d');
    let radius = 10;

    ctx.beginPath();
    ctx.moveTo(position_x, position_y);
    ctx.lineTo(position_x + width - radius, position_y);
    ctx.arc(position_x + width - radius, position_y + radius, radius, 1.5 * Math.PI, 2.0 * Math.PI, false);
    ctx.lineTo(position_x + width, position_y + height - radius);
    ctx.arc(position_x + width - radius, position_y + height - radius, radius, 2.0 * Math.PI, 0.5 * Math.PI, false);
    ctx.lineTo(position_x, position_y + height);
    ctx.arc(position_x, position_y + height - radius, radius, 0.5 * Math.PI, 1.0 * Math.PI, false);
    ctx.lineTo(position_x - radius, position_y + radius);
    ctx.arc(position_x, position_y + radius, radius, 1.0 * Math.PI, 1.5 * Math.PI, false);
    ctx.fillStyle = "rgb(30,180,190)";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "20px Gulim";
    ctx.fillText(title, position_x, position_y + height / 2);
}

function create_menu(id, position_x, position_y, width, height, menu_title, menu_list) {
    let canvas = document.getElementById('draw');
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.strokeRect(position_x, position_y, width, height);

    ctx.fillStyle = "rgb(30,180,190)";
    ctx.fillRect(position_x, position_y, width, height);

    ctx.fillStyle = "rgb(255,255,255)";
    ctx.font = "20px Gulim";
    ctx.fillText(menu_title, position_x, position_y + height / 2);

    for(let i=0;i<menu_list.length;++i) {
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.strokeRect(position_x + 10, position_y + height * (i + 1), width, height);

        ctx.fillStyle = "rgb(30,180,190)";
        ctx.fillRect(position_x + 10, position_y + height * (i + 1), width, height);

        ctx.fillStyle = "rgb(255,255,255)";
        ctx.font = "20px Gulim";
        ctx.fillText(menu_list[i], position_x + 10, position_y + height * (i + 1) + height / 2);
    }
}

create_window(1, 10, 10, 200, 200, "Window");

create_button(2, 300, 300, 200, 50, "Button");

create_button(3, 500, 500, 100, 50, "Button");

create_textbox(4, 100, 500, 200, 100, "TextBox");

create_menu(5, 800, 500, 200, 50, "Menu Title", ['item1', 'item2', 'item3']);