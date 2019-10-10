const exec = require('child_process').execSync;
try {
  exec("git pull");
  exec("npm install");
}
catch (e) {
  console.error(e.message);
  exit(1);
}

pull
install
build
test

update version
update changelog
doc
build
copy
verify packages
test+test/pkg

tag
push
publish
