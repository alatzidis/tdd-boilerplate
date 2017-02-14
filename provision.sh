apt-get -y update
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
apt-get install -y nodejs
npm install --global gulp-cli
cd /vagrant
npm install
