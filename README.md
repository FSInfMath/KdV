KdV (Kasse des Vertrauens)
===========================

Kasse des Vertrauens (point of sale) of the Student Counsil Computer Sciene and Mathematics Kiel 

Installation instructions:
--------------------------

Make sure that you have the following packages installed:

* nodejs
* nodejs-legacy
* npm

```
sudo apt-get install nodejs nodejs-legacy npm
```

```
sudo aptitude install nodejs nodejs-legacy npm
```

Clone the Repository and install the web server:
------------------------------------------------

Follow these instructions:

```
cd your/supposed/git/repository/location
```

```
git clone $this
```

```
cd repositoryDir
```

```
sudo npm install
```

To run the KDV:
---------------

```
node server.js
```

The 'KDV' now runs on port 3000
