const menuicon = document.getElementById("menu-icon")
const menulist = document.getElementById("menu-list")

menuicon.addEventListener("click", () => {
    menulist.classList.toggle("tablet")
});


let projectData = [];

function submitProject (e) {
    e.preventDefault();
    
    const projectname = document.getElementById('projectname').value;
    const startdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    const description = document.getElementById('description').value;
    const nodejs = document.getElementById('nodejs').checked;
    const reactjs = document.getElementById('reactjs').checked;
    const nextjs = document.getElementById('nextjs').checked;
    const typescrip = document.getElementById('typescrip').checked;
    const file = document.getElementById('uploadimage').files[0];

    if(projectname == '') {
        alert('Project name must be filled');
        return;
    } else if(startdate == '') {
        alert('Start date must be filled');
        return;
    } else if(enddate == '') {
        alert('End date must be filled');
        return;
    } else if(description == '') {
        alert('Description must be filled');
        return;
    } else if(!nodejs && !reactjs && !nextjs && !typescrip) {
        alert('Please select at least one stack');
        return;
    } else if(file == '') {
        alert('Please upload an image');
        return;
    }

    if(startdate > enddate) {
        alert('Start date must be less than end date');
        return;
    }

    const base64File = URL.createObjectURL(file);

    const stacks = [];
    if (nodejs) stacks.push('Node Js');
    if (reactjs) stacks.push('React Js');
    if (nextjs) stacks.push('Next Js');
    if (typescrip) stacks.push('TypeScript');


    const data = {
        projectname,
        startdate,
        enddate,
        description,
        stacks,
        file: base64File
    }

    projectData.push(data);

    document.getElementById("projects").innerHTML += renderItem(data, projectData.length - 1)
}

function renderItem (data, i) {
    return `
        <div style="padding: 10px; border-radius: 10px; box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.40);">
            <img src="${data.file}" alt="img" style="width: 100%; height: 200px; object-fit: cover;">
            <p style="font-weight: 600; margin: 0;" onclick="toDetail('${i}')">Project Name: ${data.projectname}</p>
            <p style="margin: 0;">Duration: ${jarakWaktu(data.startdate, data.enddate)} hari</p>
            <p>${data.description}</p>
            <p style="font-weight: 600;">Stacks: ${data.stacks.join(', ')}</p>
            <div style="display: flex;">
                <button style="width: 100%; margin-left: 0; margin-right: 5px;">edit</button>
                <button style="width: 100%; margin-left: 0;">delete</button>
            </div>
        </div>
    `
}

function toDetail (index) {
    const data = projectData[index];
    document.getElementById('project-title').innerText = data.projectname;
    document.getElementById('detailImage').src = data.file;
    document.getElementById('detailDates').innerText = `${data.startdate} - ${data.enddate}`;
    document.getElementById('detailDuration').innerText = `Duration: ${jarakWaktu(data.startdate, data.enddate)} days`;
    document.getElementById('detailDescription').innerText = data.description;

    let stacksElement = document.getElementById('detailStacks');
    stacksElement.innerHTML = '';
    data.stacks.forEach(stack => {
        stacksElement.innerHTML += `<p style="margin: 0">${stack}</p>`;
    });

    document.getElementById('detailApp').style.display = 'block';
    document.getElementById('formApp').style.display = 'none';
}

function closeDetail () {
    document.getElementById('detailApp').style.display = 'none';
    document.getElementById('formApp').style.display = 'block';
}

function jarakWaktu (start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}