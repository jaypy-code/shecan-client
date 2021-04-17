const { join } = require('path')
// 
const package = require(join(__dirname, '..', 'package.json'));
document.getElementById('version').innerText = package.version;
//
const { remote, shell } = require('electron');
//
const a = document.querySelector('a');
a.onclick = (event) => {
    event.preventDefault();
    shell.openExternal(a.getAttribute('href'));
}
//
const { exec } = require('child_process');
//
const button = document.getElementById('button');
//
let loading = true;

const status = () => {
    return new Promise((resolve, reject) => {
        exec(`netsh interface ip show dns name="Wi-Fi"`, (error, stdout, stderr) => {
            if (stdout.includes('178.22.122.100')) resolve(true);
            else resolve(false);
        });
    });
}

const activate = () => {
    exec(`netsh interface ip set dns name="Wi-Fi" static 178.22.122.100 && netsh interface ip add dns name="Wi-Fi" 185.51.200.2 index=2`, (error, stdout, stderr) => {
        document.body.classList.add('active');
        loading = false;
    });
}

const deactivate = () => {
    exec(`netsh interface ip set dnsservers name="Wi-Fi" source=dhcp`, (error, stdout, stderr) => {
        document.body.classList.remove('active');
        loading = false;
    });
}

button.onclick = () => {
    if (loading == true) return;
    loading = true;
    if (document.body.classList.contains('active')) {
        // deactive
        deactivate();
    } else {
        // active
        activate();
    }
}

(() => {
    status().then(result => {
        loading = false;

        remote.getCurrentWindow().show();
        remote.getCurrentWindow().focus();

        if (result == true) {
            document.body.classList.add('active');
        }
    });
})();