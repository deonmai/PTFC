Shamelessly copy and pasted from WDC. Thanks Ian!

## Windows

Windows 10 Users: Do NOT use Bash for the following instructions.
Download and Install MariaDB 10.
        Download the installer for MariaDB https://mariadb.com/downloads/, selecting the MS Windows OS.
        Run the installer, following the prompts.
            Create a password for the root user when prompted
            Ensure ```Enable access from remote machines for 'root' user``` NOT ticked
            Ensure ```Install as service``` is ticked
            Ensure ```Enable networking``` is ticked, and TCP port is ```3306```.
            If you get stuck, review the guide HERE (Links to an external site.).
        MariaDB is now installed and running.
    Setup privileges
        These steps are recommended for beginners but make the MariaDB installation insecure.
            It is recommended you uninstall or disable MariaDB after completing this course.
        From the start menu, under ```MariaDB 10.X```, open ```Command Prompt (MariaDB 10.X)```.
        Run the command ```mysql -u root -p```
            When prompted for a password, enter the password you created earlier for the root user.
        At the MariaDB [(none)]> prompt, enter the following command and press enter:
        ```CREATE USER ''@'localhost'; GRANT ALL PRIVILEGES ON *.* TO ''@'localhost'; FLUSH PRIVILEGES;```
        Close the window.
    Running the MySQL client.
        From the start menu, under ```MariaDB 10.X```, open ```Command Prompt (MariaDB 10.X)```.
        Run the command ```mysql```
        That's it!
        Type QUIT to quit your connection to the sql server.

## MacOS
Download and Install MariaDB 10 using Homebrew.
        Follow the installation instructions https://mariadb.com/kb/en/installing-mariadb-on-macos-using-homebrew/.
    Setup privileges
        These steps are recommended for beginners but make the MariaDB installation insecure.
            It is recommended you uninstall or disable MariaDB after completing this course.
        Log in to the MariaDB client:
            In a terminal run the command ```sudo mysql```
                If prompted for a password, enter your user's login password.
            If the above doesn't work run the command ```mysql -u root -p```
                When prompted for a password, enter the password you created earlier for the root user or your system's admin password if you did not set one during installation.
        At the MariaDB [(none)]> prompt, enter the following command and press enter:
        ```CREATE USER ''@'localhost'; GRANT ALL PRIVILEGES ON *.* TO ''@'localhost'; FLUSH PRIVILEGES;```
        Close the window.
    Running the MySQL client.
        In a terminal run the command ```mysql```
        That's it!
        Type QUIT to quit your connection to the sql server.
