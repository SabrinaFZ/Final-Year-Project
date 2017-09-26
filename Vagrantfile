# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
    config.vm.network :private_network, ip: "192.168.22.22"
    config.vm.network :forwarded_port, guest: 80, host: 3000

    config.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", 512]
        vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
        vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
        vb.name = "sabrina-tfg"
    end

    config.vm.provision :shell, :path => "./provision/setup.sh"
end
